export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterAdminData extends LoginCredentials {
  name: string;
  role: 'admin' | 'superadmin';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'superadmin';
  };
}

export interface ErrorResponse {
  message: string;
  status: number;
}
