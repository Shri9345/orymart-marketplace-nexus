
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductForm } from '@/components/ProductForm';
import { DashboardStats } from '@/components/seller/DashboardStats';
import { ProductsTable } from '@/components/seller/ProductsTable';
import { ProductFormData } from '@/schemas/sellerSchemas';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Product extends ProductFormData {
  id: number;
  sold: number;
  status: 'Active' | 'Inactive';
  image: string;
}

const SellerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      stock: 25,
      sold: 150,
      status: 'Active',
      category: 'Electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Smart Home Speaker',
      price: 129.99,
      stock: 12,
      sold: 89,
      status: 'Active',
      category: 'Electronics',
      description: 'Voice-controlled smart speaker with AI assistant',
      image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop'
    }
  ]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = async (productData: ProductFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Product = {
        ...productData,
        id: products.length + 1,
        sold: 0,
        status: 'Active',
        image: productData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
      };

      setProducts(prev => [...prev, newProduct]);
      setIsAddProductOpen(false);
      
      toast({
        title: "Product added successfully!",
        description: `${productData.name} has been added to your store.`,
      });
    } catch (error) {
      toast({
        title: "Failed to add product",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your products and track your sales</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats products={products} />

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary text-white gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    onSubmit={handleAddProduct}
                    onCancel={() => setIsAddProductOpen(false)}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="p-6">
            <ProductsTable products={products} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
