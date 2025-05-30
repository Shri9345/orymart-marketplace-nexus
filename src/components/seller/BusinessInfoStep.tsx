
import React from 'react';
import { Store, MapPin } from 'lucide-react';
import { FormField } from '@/components/FormField';
import { BusinessInfo } from '@/schemas/sellerSchemas';

interface BusinessInfoStepProps {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  errors: Record<string, string>;
}

export const BusinessInfoStep: React.FC<BusinessInfoStepProps> = ({
  businessInfo,
  setBusinessInfo,
  errors
}) => {
  return (
    <div className="space-y-6">
      <FormField
        id="businessName"
        label="Business Name"
        value={businessInfo.businessName}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
        placeholder="Enter your business name"
        required
        error={errors.businessName}
        icon={Store}
      />

      <FormField
        id="businessType"
        label="Business Type"
        value={businessInfo.businessType}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessType: e.target.value }))}
        placeholder="e.g., Electronics, Fashion, etc."
        required
        error={errors.businessType}
      />

      <FormField
        id="businessAddress"
        label="Business Address"
        type="textarea"
        value={businessInfo.businessAddress}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessAddress: e.target.value }))}
        placeholder="Enter your complete business address"
        required
        error={errors.businessAddress}
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
        error={errors.taxId}
      />

      <FormField
        id="businessDescription"
        label="Business Description"
        type="textarea"
        value={businessInfo.businessDescription}
        onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessDescription: e.target.value }))}
        placeholder="Describe your business and products you plan to sell"
        required
        error={errors.businessDescription}
        rows={4}
      />
    </div>
  );
};
