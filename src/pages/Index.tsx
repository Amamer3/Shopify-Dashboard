
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-store-navy text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Urban Sole Store</h1>
          <div>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center bg-slate-100">
        <div className="text-center p-6 max-w-3xl">
          <div className="h-24 w-24 bg-store-purple rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold">US</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Urban Sole Store Dashboard</h2>
          <p className="text-gray-600 text-lg mb-8">
            Welcome to the Urban Sole Store administration panel. Please log in to access the dashboard and manage your store.
          </p>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-store-purple hover:bg-purple-700">
                Continue to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="lg" className="bg-store-purple hover:bg-purple-700">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-100 p-6 border-t">
        <div className="container mx-auto text-center text-gray-500">
          <p>© 2025 Urban Sole Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
