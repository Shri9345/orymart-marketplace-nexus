
import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { FormField } from '@/components/FormField';
import { BankInfo } from '@/schemas/sellerSchemas';

interface BankInfoStepProps {
  bankInfo: BankInfo;
  setBankInfo: React.Dispatch<React.SetStateAction<BankInfo>>;
  errors: Record<string, string>;
}

export const BankInfoStep: React.FC<BankInfoStepProps> = ({
  bankInfo,
  setBankInfo,
  errors
}) => {
  return (
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
        error={errors.accountHolderName}
      />

      <FormField
        id="bankName"
        label="Bank Name"
        value={bankInfo.bankName}
        onChange={(e) => setBankInfo(prev => ({ ...prev, bankName: e.target.value }))}
        placeholder="Enter your bank name"
        required
        error={errors.bankName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="accountNumber"
          label="Account Number"
          value={bankInfo.accountNumber}
          onChange={(e) => setBankInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
          placeholder="Enter your account number"
          required
          error={errors.accountNumber}
        />

        <FormField
          id="routingNumber"
          label="Routing Number"
          value={bankInfo.routingNumber}
          onChange={(e) => setBankInfo(prev => ({ ...prev, routingNumber: e.target.value }))}
          placeholder="Enter your routing number"
          required
          error={errors.routingNumber}
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
      {errors.agreedToTerms && <p className="text-sm text-red-600">{errors.agreedToTerms}</p>}
    </div>
  );
};
