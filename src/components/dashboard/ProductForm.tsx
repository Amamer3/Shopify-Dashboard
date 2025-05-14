
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editProduct?: {
    id: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    description?: string;
    image: string;
  };
}

const categories = [
  "Running",
  "Casual",
  "Sports",
  "Streetwear",
  "Hiking",
  "Training"
];

export function ProductForm({ open, onOpenChange, editProduct }: ProductFormProps) {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: editProduct?.name || "",
    category: editProduct?.category || "",
    price: editProduct?.price ? editProduct.price.replace("$", "") : "",
    stock: editProduct?.stock || 0,
    description: editProduct?.description || "",
    image: editProduct?.image || "/placeholder.svg"
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would handle form submission, with API calls etc.
    const successMessage = editProduct 
      ? `Product "${formData.name}" updated successfully`
      : `Product "${formData.name}" added successfully`;
      
    toast({
      title: "Success",
      description: successMessage,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {editProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {editProduct 
              ? "Update the product details and save changes."
              : "Fill in the product information to add it to your inventory."
            }
          </DialogDescription>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  value={formData.price} 
                  onChange={(e) => handleChange("price", e.target.value)}
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input 
                id="stock" 
                value={formData.stock} 
                onChange={(e) => handleChange("stock", parseInt(e.target.value))}
                type="number" 
                min="0"
                placeholder="0"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-store-purple hover:bg-purple-600">
              {editProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
