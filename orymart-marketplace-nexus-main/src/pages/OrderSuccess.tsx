
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Download, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const OrderSuccess = () => {
  const orderNumber = `ORY${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                <p className="text-gray-600 font-mono">{orderNumber}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-gray-600">3-5 business days</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <p className="text-gray-600">123 Main St<br />City, State 12345</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
                <p className="text-gray-600">**** **** **** 1234</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white gap-2">
                <Package className="h-5 w-5" />
                Track Your Order
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-5 w-5" />
                Download Invoice
              </Button>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>You'll receive an email confirmation shortly</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>We'll notify you when your order ships</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Track your package with the provided tracking number</p>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Want to shop for more amazing products?</p>
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
