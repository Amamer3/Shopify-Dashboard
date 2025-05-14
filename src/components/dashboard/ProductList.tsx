
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductForm } from "@/components/dashboard/ProductForm";
import { Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  description?: string;
}

interface ProductListProps {
  onSelectItem?: (id: string, isSelected: boolean) => void;
  selectedItems?: string[];
  searchQuery?: string;
  categoryFilter?: string;
  stockFilter?: string;
}

const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Urban Runner Pro",
    category: "Running",
    price: "$129.99",
    stock: 28,
    image: "/placeholder.svg",
    description: "Professional running shoes with advanced cushioning technology."
  },
  {
    id: "P002",
    name: "City Walker Casual",
    category: "Casual",
    price: "$89.99",
    stock: 42,
    image: "/placeholder.svg",
    description: "Comfortable everyday shoes for the urban explorer."
  },
  {
    id: "P003",
    name: "Street Style High-Top",
    category: "Streetwear",
    price: "$110.00",
    stock: 15,
    image: "/placeholder.svg",
    description: "Fashionable high-top sneakers for the style-conscious."
  },
  {
    id: "P004",
    name: "Performance Basketball",
    category: "Sports",
    price: "$145.99",
    stock: 23,
    image: "/placeholder.svg",
    description: "Professional basketball shoes with ankle support and grip."
  },
  {
    id: "P005",
    name: "Comfort Slip-On",
    category: "Casual",
    price: "$69.99",
    stock: 3,
    image: "/placeholder.svg",
    description: "Easy slip-on shoes for casual comfort."
  },
];

export const ProductList = ({
  onSelectItem,
  selectedItems = [],
  searchQuery = "",
  categoryFilter = "",
  stockFilter = "",
}: ProductListProps) => {
  const { toast } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [productFormOpen, setProductFormOpen] = useState(false);

  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.id.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Category filter
    const matchesCategory = categoryFilter 
      ? product.category === categoryFilter
      : true;
    
    // Stock filter
    let matchesStock = true;
    if (stockFilter === 'in-stock') {
      matchesStock = product.stock > 10;
    } else if (stockFilter === 'low-stock') {
      matchesStock = product.stock <= 10 && product.stock > 0;
    } else if (stockFilter === 'out-of-stock') {
      matchesStock = product.stock === 0;
    }
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleDelete = (id: string, name: string) => {
    setProducts(products.filter(product => product.id !== id));
    
    toast({
      title: "Product Deleted",
      description: `${name} has been removed from your inventory`,
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setProductFormOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectItem) {
      filteredProducts.forEach(product => {
        onSelectItem(product.id, checked);
      });
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            {onSelectItem && (
              <div className="mr-4">
                <Checkbox 
                  id="select-all"
                  checked={
                    filteredProducts.length > 0 && 
                    filteredProducts.every(p => selectedItems.includes(p.id))
                  }
                  onCheckedChange={handleSelectAll}
                />
              </div>
            )}
            <h2 className="font-semibold text-lg">Products</h2>
            <span className="ml-2 text-sm text-gray-500">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                {onSelectItem && <th className="px-6 py-3 w-10"></th>}
                <th className="font-medium text-left px-6 py-3">Product</th>
                <th className="font-medium text-left px-6 py-3">Category</th>
                <th className="font-medium text-left px-6 py-3">Price</th>
                <th className="font-medium text-left px-6 py-3">Stock</th>
                <th className="font-medium text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={onSelectItem ? 6 : 5} className="px-6 py-8 text-center text-gray-500">
                    No products match your search criteria
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
                    {onSelectItem && (
                      <td className="px-6 py-4">
                        <Checkbox 
                          checked={selectedItems.includes(product.id)} 
                          onCheckedChange={(checked) => {
                            onSelectItem(product.id, !!checked);
                          }}
                        />
                      </td>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">#{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium">{product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        product.stock > 20 
                          ? "bg-green-100 text-store-success" 
                          : product.stock > 10 
                          ? "bg-yellow-100 text-store-warning" 
                          : "bg-red-100 text-store-error"
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-store-error hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Product Dialog */}
      {editingProduct && (
        <ProductForm 
          open={productFormOpen}
          onOpenChange={setProductFormOpen}
          editProduct={editingProduct}
        />
      )}
    </>
  );
};
