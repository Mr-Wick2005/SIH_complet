import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

import logoImage from 'figma:asset/78bc8dcd9bd312650408779b924c163f8a10ea43.png';

interface EnhancedLoginScreenProps {
  onCitizenLogin: () => void;
  onFieldWorkerLogin: () => void;
  onSignup: () => void;
  onGuestContinue: () => void;
}

export function EnhancedLoginScreen({ 
  onCitizenLogin, 
  onFieldWorkerLogin, 
  onSignup, 
  onGuestContinue 
}: EnhancedLoginScreenProps) {
  const [isFieldWorker, setIsFieldWorker] = useState(false);
  const [step, setStep] = useState<'login' | 'otp'>('login');
  
  // Citizen login states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  
  // Field worker login states
  const [govtId, setGovtId] = useState('');
  const [password, setPassword] = useState('');
  


  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onCitizenLogin();
    }
  };

  const handleFieldWorkerLogin = () => {
    if (govtId && password) {
      onFieldWorkerLogin();
    }
  };



  const resetForm = () => {
    setStep('login');
    setPhone('');
    setOtp('');
    setGovtId('');
    setPassword('');

  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mb-4 flex items-center justify-center mx-auto">
          <img 
            src={logoImage} 
            alt="CitySeva Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-[#1E2A38] mb-2">Welcome to CitySeva</h1>
        <p className="text-[#6c757d]">
          {isFieldWorker ? 'Field Worker Access Portal' : 'Sign in to report and track civic issues'}
        </p>
      </div>

      {/* Toggle Tabs */}
      <div className="mb-8">
        <div className="flex bg-[#f8f9fa] rounded-lg p-1">
          <button
            onClick={() => {
              setIsFieldWorker(false);
              resetForm();
            }}
            className={`flex-1 py-3 px-4 rounded-md transition-colors ${
              !isFieldWorker 
                ? 'bg-[#1E2A38] text-white' 
                : 'text-[#6c757d] hover:text-[#1E2A38]'
            }`}
          >
            Citizen Login
          </button>
          <button
            onClick={() => {
              setIsFieldWorker(true);
              resetForm();
            }}
            className={`flex-1 py-3 px-4 rounded-md transition-colors ${
              isFieldWorker 
                ? 'bg-[#1E2A38] text-white' 
                : 'text-[#6c757d] hover:text-[#1E2A38]'
            }`}
          >
            Field Worker Login
          </button>
        </div>
      </div>

      {/* Citizen Login Flow */}
      {!isFieldWorker && step === 'login' && (
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            <div>
              <Label htmlFor="phone" className="text-[#1E2A38]">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
                maxLength={10}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleSendOTP}
              disabled={phone.length !== 10}
              className="w-full h-12 bg-[#000080] hover:bg-[#000066] text-white"
            >
              Send OTP
            </Button>

            <div className="flex items-center">
              <div className="flex-1 border-t border-[#e9ecef]"></div>
              <span className="px-4 text-sm text-[#6c757d]">or</span>
              <div className="flex-1 border-t border-[#e9ecef]"></div>
            </div>

            <Button 
              onClick={onGuestContinue}
              variant="outline"
              className="w-full h-12 border-[#e9ecef] text-[#1E2A38] hover:bg-[#f8f9fa]"
            >
              Continue as Guest
            </Button>

            <div className="text-center">
              <span className="text-[#6c757d]">New user? </span>
              <button 
                onClick={onSignup}
                className="text-[#000080] hover:underline"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Citizen OTP Verification */}
      {!isFieldWorker && step === 'otp' && (
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            <div className="text-center">
              <h2 className="text-[#1E2A38] mb-2">Enter OTP</h2>
              <p className="text-[#6c757d]">We've sent a 6-digit OTP to {phone}</p>
            </div>

            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="border-[#e9ecef]" />
                  <InputOTPSlot index={1} className="border-[#e9ecef]" />
                  <InputOTPSlot index={2} className="border-[#e9ecef]" />
                  <InputOTPSlot index={3} className="border-[#e9ecef]" />
                  <InputOTPSlot index={4} className="border-[#e9ecef]" />
                  <InputOTPSlot index={5} className="border-[#e9ecef]" />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6}
              className="w-full h-12 bg-[#000080] hover:bg-[#000066] text-white"
            >
              Verify OTP
            </Button>

            <div className="text-center">
              <button 
                onClick={() => setStep('login')}
                className="text-[#6c757d] hover:text-[#1E2A38]"
              >
                ← Back to Phone Number
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Field Worker Login */}
      {isFieldWorker && step === 'login' && (
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            <div>
              <Label htmlFor="govtId" className="text-[#1E2A38]">Government ID</Label>
              <Input
                id="govtId"
                type="text"
                placeholder="Enter your Government ID"
                value={govtId}
                onChange={(e) => setGovtId(e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#1E2A38]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-12 bg-[#f8f9fa] border-[#e9ecef] text-[#1E2A38]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleFieldWorkerLogin}
              disabled={!govtId || !password}
              className="w-full h-12 bg-[#000080] hover:bg-[#000066] text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}


    </div>
  );
}