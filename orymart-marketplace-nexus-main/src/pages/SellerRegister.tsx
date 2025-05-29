
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Store, Phone, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SellerRegister = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Business Info
    businessName: '',
    businessType: '',
    businessAddress: '',
    taxId: '',
    businessDescription: '',
    
    // Bank Info
    accountHolderName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical",
        variant: "destructive",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        title: "Please accept terms",
        description: "You must agree to the seller terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(formData.email, formData.password, formData.name, 'seller');
      if (success) {
        toast({
          title: "Seller account created successfully!",
          description: "Welcome to OryMart! Your account is under review.",
        });
        navigate('/seller-dashboard');
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <div className="mt-1 relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <div className="mt-1 relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="mt-1 relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="mt-1 relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="businessName">Business Name</Label>
        <div className="mt-1 relative">
          <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            id="businessName"
            name="businessName"
            type="text"
            value={formData.businessName}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Enter your business name"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="businessType">Business Type</Label>
        <Input
          id="businessType"
          name="businessType"
          type="text"
          value={formData.businessType}
          onChange={handleInputChange}
          placeholder="e.g., Electronics, Fashion, etc."
          required
        />
      </div>

      <div>
        <Label htmlFor="businessAddress">Business Address</Label>
        <div className="mt-1 relative">
          <MapPin className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          <Textarea
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Enter your complete business address"
            rows={3}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="taxId">Tax ID / GST Number</Label>
        <Input
          id="taxId"
          name="taxId"
          type="text"
          value={formData.taxId}
          onChange={handleInputChange}
          placeholder="Enter your tax identification number"
          required
        />
      </div>

      <div>
        <Label htmlFor="businessDescription">Business Description</Label>
        <Textarea
          id="businessDescription"
          name="businessDescription"
          value={formData.businessDescription}
          onChange={handleInputChange}
          placeholder="Describe your business and products you plan to sell"
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderBankInfo = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-sm text-blue-800">
            <strong>Secure Banking Information</strong> - This information is encrypted and used only for payment processing.
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="accountHolderName">Account Holder Name</Label>
        <Input
          id="accountHolderName"
          name="accountHolderName"
          type="text"
          value={formData.accountHolderName}
          onChange={handleInputChange}
          placeholder="Enter account holder's full name"
          required
        />
      </div>

      <div>
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          name="bankName"
          type="text"
          value={formData.bankName}
          onChange={handleInputChange}
          placeholder="Enter your bank name"
          required
        />
      </div>

      <div>
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          type="text"
          value={formData.accountNumber}
          onChange={handleInputChange}
          placeholder="Enter your account number"
          required
        />
      </div>

      <div>
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          name="routingNumber"
          type="text"
          value={formData.routingNumber}
          onChange={handleInputChange}
          placeholder="Enter your routing number"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="agree-seller-terms"
          name="agree-seller-terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="agree-seller-terms" className="ml-2 block text-sm text-gray-900">
          I agree to the{' '}
          <Link to="/seller-terms" className="text-purple-600 hover:text-purple-500">
            Seller Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
            Privacy Policy
          </Link>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <span className="text-2xl font-bold text-gradient">OryMart</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Become a Seller</h1>
          <p className="mt-2 text-gray-600">Join thousands of successful sellers on OryMart</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep 
                    ? 'gradient-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'gradient-primary' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <div className="text-sm text-gray-600">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Business Information' :
                'Banking Information'
              }
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderPersonalInfo()}
            {currentStep === 2 && renderBusinessInfo()}
            {currentStep === 3 && renderBankInfo()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="px-6"
                >
                  Previous
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="gradient-primary text-white px-6"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="gradient-primary text-white px-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Seller Account'}
                  </Button>
                )}
              </div>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have a seller account?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
              Sign in
            </Link>
          </p>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Want to shop instead?{' '}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Create buyer account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
