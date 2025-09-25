import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import logoImage from 'figma:asset/78bc8dcd9bd312650408779b924c163f8a10ea43.png';

interface LoginScreenProps {
  onLogin: () => void;
  onSignup: () => void;
  onGuestContinue: () => void;
}

export function LoginScreen({ onLogin, onSignup, onGuestContinue }: LoginScreenProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onLogin();
    }
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
        <h1 className="text-2xl text-[#1E2A38] mb-2">Welcome to CitySeva</h1>
        <p className="text-[#6c757d]">Sign in to report and track civic issues</p>
      </div>

      {step === 'phone' ? (
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
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 mb-8">
            <div className="text-center">
              <h2 className="text-xl text-[#1E2A38] mb-2">Enter OTP</h2>
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
                onClick={() => setStep('phone')}
                className="text-[#6c757d] hover:text-[#1E2A38]"
              >
                ← Back to Phone Number
              </button>
            </div>

            <div className="text-center">
              <span className="text-[#6c757d]">Didn't receive OTP? </span>
              <button className="text-[#000080] hover:underline">
                Resend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}