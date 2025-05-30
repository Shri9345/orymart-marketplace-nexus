
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Store, Phone, MapPin, CreditCard } from 'lucide-react';
import { MultiStepForm } from '@/components/MultiStepForm';
import { FormField } from '@/components/FormField';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  personalInfoSchema,
  businessInfoSchema,
  bankInfoSchema,
  PersonalInfo,
  BusinessInfo,
  BankInfo
} from '@/schemas/sellerSchemas';

const SellerRegister = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: '',
    businessType: '',
    businessAddress: '',
    taxId: '',
    businessDescription: ''
  });

  const [bankInfo, setBankInfo] = useState<BankInfo>({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateStep = (step: number) => {
    const schemas = [personalInfoSchema, businessInfoSchema, bankInfoSchema];
    const data = [personalInfo, businessInfo, bankInfo];
    
    try {
      schemas[step].parse(data[step]);
      setErrors(prev => ({ ...prev, [step]: {} }));
      return true;
    } catch (error: any) {
      const stepErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        stepErrors[err.path[0]] = err.message;
      });
      setErrors(prev => ({ ...prev, [step]: stepErrors }));
      return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    try {
      const success = await register(personalInfo.email, personalInfo.password, personalInfo.name, 'seller');
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

  // Personal Info Step Component
  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <FormField
        id="name"
        label="Full Name"
        value={personalInfo.name}
        onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Enter your full name"
        required
        error={errors[0]?.name}
        icon={User}
      />

      <FormField
        id="email"
        label="Email Address"
        type="email"
        value={personalInfo.email}
        onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Enter your email"
        required
        error={errors[0]?.email}
        icon={Mail}
      />

      <FormField
        id="phone"
        label="Phone Number"
        type="tel"
        value={personalInfo.phone}
        onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
        placeholder="Enter your phone number"
        required
        error={errors[0]?.phone}
        icon={Phone}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={personalInfo.password}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, password: e.target.value }))}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors[0]?.password && <p className="text-sm text-red-600">{errors[0].password}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={personalInfo.confirmPassword}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors[0]?.confirmPassword && <p className="text-sm text-red-600">{errors[0].confirmPassword}</p>}
        </div>
      </div>
    </div>
  );

  // Business Info Step Component
  const BusinessInfoStep = () => (
    <div className="space-y-6">
      <FormField
        id="businessName"
        label="Business Name"
        value={businessInfo.businessName}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
        placeholder="Enter your business name"
        required
        error={errors[1]?.businessName}
        icon={Store}
      />

      <FormField
        id="businessType"
        label="Business Type"
        value={businessInfo.businessType}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessType: e.target.value }))}
        placeholder="e.g., Electronics, Fashion, etc."
        required
        error={errors[1]?.businessType}
      />

      <FormField
        id="businessAddress"
        label="Business Address"
        type="textarea"
        value={businessInfo.businessAddress}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessAddress: e.target.value }))}
        placeholder="Enter your complete business address"
        required
        error={errors[1]?.businessAddress}
        icon={MapPin}
        rows={3}
      />

      <FormField
        id="taxId"
        label="Tax ID / GST Number"
        value={businessInfo.taxId}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, taxId: e.target.value }))}
        placeholder="Enter your tax identification number"
        required
        error={errors[1]?.taxId}
      />

      <FormField
        id="businessDescription"
        label="Business Description"
        type="textarea"
        value={businessInfo.businessDescription}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessDescription: e.target.value }))}
        placeholder="Describe your business and products you plan to sell"
        required
        error={errors[1]?.businessDescription}
        rows={4}
      />
    </div>
  );

  // Bank Info Step Component
  const BankInfoStep = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-sm text-blue-800">
            <strong>Secure Banking Information</strong> - This information is encrypted and used only for payment processing.
          </p>
        </div>
      </div>

      <FormField
        id="accountHolderName"
        label="Account Holder Name"
        value={bankInfo.accountHolderName}
        onChange={(e) => setBankInfo(prev => ({ ...prev, accountHolderName: e.target.value }))}
        placeholder="Enter account holder's full name"
        required
        error={errors[2]?.accountHolderName}
      />

      <FormField
        id="bankName"
        label="Bank Name"
        value={bankInfo.bankName}
        onChange={(e) => setBankInfo(prev => ({ ...prev, bankName: e.target.value }))}
        placeholder="Enter your bank name"
        required
        error={errors[2]?.bankName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="accountNumber"
          label="Account Number"
          value={bankInfo.accountNumber}
          onChange={(e) => setBankInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
          placeholder="Enter your account number"
          required
          error={errors[2]?.accountNumber}
        />

        <FormField
          id="routingNumber"
          label="Routing Number"
          value={bankInfo.routingNumber}
          onChange={(e) => setBankInfo(prev => ({ ...prev, routingNumber: e.target.value }))}
          placeholder="Enter your routing number"
          required
          error={errors[2]?.routingNumber}
        />
      </div>

      <div className="flex items-center">
        <input
          id="agreedToTerms"
          type="checkbox"
          checked={bankInfo.agreedToTerms}
          onChange={(e) => setBankInfo(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-900">
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
      {errors[2]?.agreedToTerms && <p className="text-sm text-red-600">{errors[2].agreedToTerms}</p>}
    </div>
  );

  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: <PersonalInfoStep />,
      isValid: validateStep(0)
    },
    {
      title: 'Business Information',
      description: 'Share your business details',
      component: <BusinessInfoStep />,
      isValid: validateStep(1)
    },
    {
      title: 'Banking Information',
      description: 'Set up payment processing',
      component: <BankInfoStep />,
      isValid: validateStep(2)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
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

      <MultiStepForm
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
      />

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600">
          Already have a seller account?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            Sign in
          </Link>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Want to shop instead?{' '}
          <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
            Create buyer account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerRegister;
