type RequestConfig = {
  method?: string;
  token?: string;
  body?: any;
  requiresAuth?: boolean;
};

interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: Record<string, any>;
}

interface ErrorResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

class SessionExpiredError extends Error {
  constructor(message: string = 'Your session has expired. Please log in again.') {
    super(message);
    this.name = 'SessionExpiredError';
  }
}

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://shopify-server-ws3z.onrender.com/api',
  TIMEOUT: 15000,
  
  getHeaders: (token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      // Ensure token is properly formatted
      const formattedToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      headers['Authorization'] = formattedToken;
      
      // Add these headers for CORS
      headers['Access-Control-Allow-Credentials'] = 'true';
      headers['Access-Control-Allow-Origin'] = '*';
    }

    return headers;
  },

  async fetchApi<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', token, body, requiresAuth = true } = config;
    const maxRetries = 2;
    let retryCount = 0;

    const makeRequest = async (): Promise<T> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT);

      try {
        // Only check for token if the endpoint requires authentication
        if (requiresAuth && !token) {
          throw new SessionExpiredError();
        }

        const headers = this.getHeaders(token);
        
        const requestInit: RequestInit = {
          method,
          headers,
          credentials: 'same-origin', // Changed from 'include' to 'same-origin'
          signal: controller.signal,
          mode: 'cors'
        };

        if (body) {
          requestInit.body = JSON.stringify(body);
        }

        // Debug headers
        console.log('Request headers:', {
          ...headers,
          Authorization: headers.Authorization ? 'Bearer [TOKEN]' : undefined // Hide actual token in logs
        });

        const url = `${this.BASE_URL}${endpoint}`;
        console.log(`API Request [${method}]:`, {
          url,
          method,
          mode: requestInit.mode,
          credentials: requestInit.credentials,
          body: body ? '[REQUEST BODY]' : undefined, // Hide sensitive data in logs
          retry: retryCount
        });

        const response = await fetch(url, requestInit);
        
        // Debug response
        console.log(`API Response [${method}]:`, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });

        clearTimeout(timeoutId);

        // Handle 401/403 responses
        if (response.status === 401 || response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Auth error response:', errorData);
          
          if (requiresAuth) {
            throw new SessionExpiredError(
              errorData.message || 'Your session has expired. Please log in again.'
            );
          }
          
          throw new Error(errorData.message || 'Authentication failed');
        }

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json().catch(() => ({}));
          console.error('Error response data:', errorData);
          const error = new Error(errorData.message || `HTTP error! status: ${response.status}`) as ApiError;
          error.status = response.status;
          error.details = errorData;
          throw error;
        }

        const data = await response.json();
        return data as T;
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new Error('Request timed out');
          }
          // Log the actual error for debugging
          console.error('API request error:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          });
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    };

    while (retryCount < maxRetries) {
      try {
        return await makeRequest();
      } catch (error) {
        if (
          error instanceof Error && 
          !(error instanceof SessionExpiredError) && 
          retryCount < maxRetries - 1
        ) {
          retryCount++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          continue;
        }
        throw error;
      }
    }

    throw new Error('Max retries exceeded');
  }
};
