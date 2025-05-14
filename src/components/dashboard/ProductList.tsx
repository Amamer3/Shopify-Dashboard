
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: "P001",
    name: "Urban Runner Pro",
    category: "Running",
    price: "$129.99",
    stock: 28,
    image: "/placeholder.svg",
  },
  {
    id: "P002",
    name: "City Walker Casual",
    category: "Casual",
    price: "$89.99",
    stock: 42,
    image: "/placeholder.svg",
  },
  {
    id: "P003",
    name: "Street Style High-Top",
    category: "Streetwear",
    price: "$110.00",
    stock: 15,
    image: "/placeholder.svg",
  },
  {
    id: "P004",
    name: "Performance Basketball",
    category: "Sports",
    price: "$145.99",
    stock: 23,
    image: "/placeholder.svg",
  },
  {
    id: "P005",
    name: "Comfort Slip-On",
    category: "Casual",
    price: "$69.99",
    stock: 37,
    image: "/placeholder.svg",
  },
];

export const ProductList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Products</h2>
        <Button size="sm" className="bg-store-purple hover:bg-purple-600">
          <Plus className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left px-6 py-3">Product</th>
              <th className="font-medium text-left px-6 py-3">Category</th>
              <th className="font-medium text-left px-6 py-3">Price</th>
              <th className="font-medium text-left px-6 py-3">Stock</th>
              <th className="font-medium text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
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
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-store-error hover:text-red-700 hover:bg-red-50">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
