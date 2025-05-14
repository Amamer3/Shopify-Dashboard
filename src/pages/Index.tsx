
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-store-navy text-white">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Urban Sole Store Dashboard</h1>
        <p className="text-lg mb-8 text-gray-300">Welcome to your comprehensive footwear store management system.</p>
        <Link to="/dashboard">
          <Button size="lg" className="bg-store-purple hover:bg-purple-600 text-white flex items-center gap-2">
            Go to Dashboard <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="mt-16 text-gray-400 text-sm">
        <p>© 2025 Urban Sole Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
