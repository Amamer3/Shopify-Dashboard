
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { ProductList } from "@/components/dashboard/ProductList";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { CategoryManager } from "@/components/dashboard/CategoryManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Filter, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { toast } = useToast();
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const handleAddProduct = () => {
    setProductFormOpen(true);
  };

  const handleSelectItem = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select items to delete",
      });
      return;
    }

    toast({
      title: "Items Deleted",
      description: `${selectedItems.length} items have been deleted`,
    });
    setSelectedItems([]);
  };

  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header 
        title="Products" 
        subtitle="Manage your product inventory"
      />
      
      <div className="p-6">
        {/* Tabs */}
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            {/* Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 md:w-80 bg-white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="streetwear">Streetwear</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Stock Status" />
                    </SelectTrigger>
                    <SelectContent>                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={() => {
                    setSearchQuery("");                    setCategoryFilter("all");
                    setStockFilter("all");
                  }}>
                    <Filter className="h-4 w-4 mr-2" /> Reset
                  </Button>
                </div>
                
                <div className="flex gap-2 ml-auto">
                  {selectedItems.length > 0 && (
                    <Button 
                      variant="outline" 
                      className="text-store-error hover:bg-red-50"
                      onClick={handleBulkDelete}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete ({selectedItems.length})
                    </Button>
                  )}
                  
                  <Button 
                    className="bg-store-purple hover:bg-purple-600" 
                    onClick={handleAddProduct}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product List */}
            <div className="mb-6">
              <ProductList 
                onSelectItem={handleSelectItem} 
                selectedItems={selectedItems}
                searchQuery={searchQuery}
                categoryFilter={categoryFilter}
                stockFilter={stockFilter}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <CategoryManager />
          </TabsContent>
        </Tabs>
        
        {/* Product Form Dialog */}
        <ProductForm 
          open={productFormOpen} 
          onOpenChange={setProductFormOpen} 
        />
      </div>
    </div>
  );
};

export default Products;
