
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash, X } from "lucide-react";

// Mock categories data
const initialCategories = [
  { id: "1", name: "Running", productCount: 12 },
  { id: "2", name: "Casual", productCount: 18 },
  { id: "3", name: "Sports", productCount: 8 },
  { id: "4", name: "Streetwear", productCount: 7 },
  { id: "5", name: "Hiking", productCount: 5 },
  { id: "6", name: "Training", productCount: 10 },
];

export function CategoryManager() {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleOpenDialog = (category?: { id: string; name: string }) => {
    if (category) {
      setEditingCategory(category);
      setNewCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setNewCategoryName("");
    }
    setOpen(true);
  };

  const handleSaveCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: newCategoryName } 
          : cat
      ));
      
      toast({
        title: "Success",
        description: `Category "${newCategoryName}" updated successfully`,
      });
    } else {
      // Add new category
      const newId = (Math.max(...categories.map(c => parseInt(c.id))) + 1).toString();
      
      setCategories([
        ...categories, 
        { id: newId, name: newCategoryName, productCount: 0 }
      ]);
      
      toast({
        title: "Success",
        description: `Category "${newCategoryName}" added successfully`,
      });
    }
    
    setOpen(false);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    // In a real app, check if category has products before deletion
    setCategories(categories.filter(cat => cat.id !== id));
    
    toast({
      title: "Category Deleted",
      description: `Category "${name}" has been deleted`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Product Categories</h2>
        <Button 
          size="sm" 
          className="bg-store-purple hover:bg-purple-600"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleOpenDialog({ id: category.id, name: category.name })}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 p-0 text-store-error hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteCategory(category.id, category.name)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Category Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory 
                ? "Update the category name below."
                : "Enter a name for the new product category."
              }
            </DialogDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4" 
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveCategory}
              className="bg-store-purple hover:bg-purple-600"
            >
              {editingCategory ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
