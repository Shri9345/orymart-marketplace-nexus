
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MultiStepForm } from '@/components/MultiStepForm';
import { PersonalInfoStep } from '@/components/seller/PersonalInfoStep';
import { BusinessInfoStep } from '@/components/seller/BusinessInfoStep';
import { BankInfoStep } from '@/components/seller/BankInfoStep';
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

  const steps = [
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      component: (
        <PersonalInfoStep
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          errors={errors[0] || {}}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      ),
      isValid: validateStep(0)
    },
    {
      title: 'Business Information',
      description: 'Share your business details',
      component: (
        <BusinessInfoStep
          businessInfo={businessInfo}
          setBusinessInfo={setBusinessInfo}
          errors={errors[1] || {}}
        />
      ),
      isValid: validateStep(1)
    },
    {
      title: 'Banking Information',
      description: 'Set up payment processing',
      component: (
        <BankInfoStep
          bankInfo={bankInfo}
          setBankInfo={setBankInfo}
          errors={errors[2] || {}}
        />
      ),
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
