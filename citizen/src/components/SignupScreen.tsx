import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import logoImage from 'figma:asset/78bc8dcd9bd312650408779b924c163f8a10ea43.png';

interface SignupScreenProps {
  onSignupComplete: () => void;
  onBackToLogin: () => void;
}

export function SignupScreen({ onSignupComplete, onBackToLogin }: SignupScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    aadhaar: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSignupComplete();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName.length > 0 && formData.phone.length === 10;
      case 2:
        return formData.city.length > 0 && formData.district.length > 0; // Make city and district required
      case 3:
        return formData.aadhaar.length === 12;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={step === 1 ? onBackToLogin : () => setStep(step - 1)}
          className="text-[#1E2A38] mr-4"
        >
          ←
        </button>
        <div>
          <h1 className="text-xl text-[#1E2A38]">Create Account</h1>
          <p className="text-sm text-[#6c757d]">Step {step} of 4</p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex space-x-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1 rounded-full ${
              i <= step ? 'bg-[#000080]' : 'bg-[#e9ecef]'
            }`}
          ></div>
        ))}
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg text-[#1E2A38] mb-2">Basic Information</h2>
              <p className="text-[#6c757d]">Let's start with your name and phone number</p>
            </div>

            <div>
              <Label htmlFor="fullName" className="text-[#1E2A38]">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-[#1E2A38]">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
                maxLength={10}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg text-[#1E2A38] mb-2">Location Details</h2>
              <p className="text-[#6c757d]">Required for local issue reporting</p>
            </div>

            <div>
              <Label htmlFor="email" className="text-[#1E2A38]">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
              />
            </div>

            <div>
              <Label htmlFor="city" className="text-[#1E2A38]">City *</Label>
              <Input
                id="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
              />
            </div>

            <div>
              <Label className="text-[#1E2A38]">District *</Label>
              <Select value={formData.district} onValueChange={(value) => updateFormData('district', value)}>
                <SelectTrigger className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]">
                  <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ranchi">Ranchi</SelectItem>
                  <SelectItem value="jamshedpur">Jamshedpur</SelectItem>
                  <SelectItem value="dhanbad">Dhanbad</SelectItem>
                  <SelectItem value="bokaro">Bokaro</SelectItem>
                  <SelectItem value="deoghar">Deoghar</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-lg text-[#1E2A38] mb-2">Identity Verification</h2>
              <p className="text-[#6c757d]">For secure account verification</p>
            </div>

            <div>
              <Label htmlFor="aadhaar" className="text-[#1E2A38]">Aadhaar Number *</Label>
              <Input
                id="aadhaar"
                placeholder="12-digit Aadhaar number"
                value={formData.aadhaar}
                onChange={(e) => updateFormData('aadhaar', e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
                maxLength={12}
              />
              <p className="text-xs text-[#6c757d] mt-1">
                * This is for verification purposes only and will be kept secure
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#138808] rounded-full flex items-center justify-center mx-auto">
              <div className="text-white text-2xl">✓</div>
            </div>
            
            <div>
              <h2 className="text-xl text-[#1E2A38] mb-2">Account Created!</h2>
              <p className="text-[#6c757d] mb-4">Your profile is being verified</p>
              
              <div className="bg-[#fff3cd] border border-[#ffeaa7] rounded-lg p-4">
                <p className="text-sm text-[#856404]">
                  <span className="block mb-1">⏳ Verification Pending</span>
                  You can start using the app while we verify your details
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8">
        <Button 
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full h-12 bg-[#000080] hover:bg-[#000066] text-white"
        >
          {step === 4 ? 'Start Using CitySeva' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}