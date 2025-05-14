
import { Header } from "@/components/dashboard/Header";
import { ProductList } from "@/components/dashboard/ProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus } from "lucide-react";

const Products = () => {
  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header 
        title="Products" 
        subtitle="Manage your product inventory"
      />
      
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search products..." 
              className="pl-10 md:w-80 bg-white" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button className="bg-store-purple hover:bg-purple-600 flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>
        
        {/* Product List */}
        <div className="mb-6">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Products;
