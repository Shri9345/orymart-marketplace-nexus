
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormField } from './FormField';
import { productSchema, ProductFormData } from '@/schemas/sellerSchemas';
import { useToast } from '@/hooks/use-toast';
import { Package, DollarSign, Hash, Tag, FileText, Image } from 'lucide-react';

interface ProductFormProps {
  onSubmit: (product: ProductFormData) => void;
  onCancel: () => void;
  initialData?: Partial<ProductFormData>;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData.name || '',
    price: initialData.price || 0,
    stock: initialData.stock || 0,
    category: initialData.category || '',
    description: initialData.description || '',
    image: initialData.image || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const processedValue = name === 'price' || name === 'stock' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    try {
      productSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        label="Product Name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter product name"
        required
        error={errors.name}
        icon={Package}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          error={errors.price}
          icon={DollarSign}
        />

        <FormField
          id="stock"
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
          required
          error={errors.stock}
          icon={Hash}
        />
      </div>

      <FormField
        id="category"
        label="Category"
        value={formData.category}
        onChange={handleChange}
        placeholder="e.g., Electronics, Fashion, Books"
        required
        error={errors.category}
        icon={Tag}
      />

      <FormField
        id="description"
        label="Product Description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe your product in detail..."
        required
        error={errors.description}
        icon={FileText}
        rows={4}
      />

      <FormField
        id="image"
        label="Product Image URL"
        value={formData.image || ''}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        error={errors.image}
        icon={Image}
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 gradient-primary text-white"
        >
          {isLoading ? 'Adding Product...' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
};
