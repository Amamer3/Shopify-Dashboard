import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();  const handleError = (error: unknown) => {
    let title = "Login Failed";
    let description = "Unable to connect to the server. Please try again.";
    
    if (error instanceof Error) {
      if (error.name === 'AuthenticationError') {
        if (error.message.toLowerCase().includes('incorrect email or password') ||
            error.message.toLowerCase().includes('invalid credentials')) {
          title = "Invalid Credentials";
          description = "The email or password you entered is incorrect. Please try again.";
        } else if (error.message.includes('session')) {
          title = "Session Expired";
          description = "Your session has expired. Please log in again.";
        } else {
          title = "Authentication Failed";
          description = error.message;
        }
      } else if (error.message.includes('timed out')) {
        title = "Connection Timeout";
        description = "The server is taking too long to respond. Please try again.";
      } else if (error.message.includes('network') || error.message.includes('connect')) {
        title = "Connection Error";
        description = "Unable to connect to the server. Please check your internet connection.";
      } else {
        description = error.message;
      }
    }
    
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login({ email, password });
      toast({
        title: "Login Successful",
        description: "Welcome to Your Shopify-Sneakers dashboard",
      });
      navigate("/dashboard");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-store-navy flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Shopify Sneakers</CardTitle>
          <CardDescription>Admin Dashboard Login</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-store-purple hover:underline">
                  Forgot password?
                </a>
              </div>              <Input 
                id="password" 
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-store-navy hover:bg-store-navy/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
