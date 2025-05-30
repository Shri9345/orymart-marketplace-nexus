
import React from 'react';
import { Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react';
import { FormField } from '@/components/FormField';
import { PersonalInfo } from '@/schemas/sellerSchemas';

interface PersonalInfoStepProps {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  errors: Record<string, string>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  personalInfo,
  setPersonalInfo,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  return (
    <div className="space-y-6">
      <FormField
        id="name"
        label="Full Name"
        value={personalInfo.name}
        onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Enter your full name"
        required
        error={errors.name}
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
        error={errors.email}
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
        error={errors.phone}
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
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
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
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
      </div>
    </div>
  );
};
