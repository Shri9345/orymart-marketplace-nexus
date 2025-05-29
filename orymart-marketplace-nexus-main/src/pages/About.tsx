
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">About OryMart</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              OryMart is a revolutionary e-commerce platform that connects buyers and sellers from around the world. 
              Our mission is to create a trusted marketplace where quality products meet satisfied customers.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6">
              To become the world's most trusted marketplace, empowering millions of sellers to reach global customers 
              while providing buyers with access to the best products at competitive prices.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose OryMart?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Verified sellers and quality products</li>
              <li>Secure payment processing</li>
              <li>Fast and reliable shipping</li>
              <li>24/7 customer support</li>
              <li>Easy returns and refunds</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
