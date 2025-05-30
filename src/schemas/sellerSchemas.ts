
import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const businessInfoSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessType: z.string().min(2, 'Business type is required'),
  businessAddress: z.string().min(10, 'Complete address is required'),
  taxId: z.string().min(5, 'Tax ID is required'),
  businessDescription: z.string().min(20, 'Description must be at least 20 characters')
});

export const bankInfoSchema = z.object({
  accountHolderName: z.string().min(2, 'Account holder name is required'),
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(8, 'Valid account number is required'),
  routingNumber: z.string().min(9, 'Valid routing number is required'),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  stock: z.number().int().min(0, 'Stock must be a positive number'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Valid image URL is required').optional()
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type BusinessInfo = z.infer<typeof businessInfoSchema>;
export type BankInfo = z.infer<typeof bankInfoSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
