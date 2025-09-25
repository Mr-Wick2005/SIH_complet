import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/78bc8dcd9bd312650408779b924c163f8a10ea43.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Tricolor accent stripe */}
      <div className="w-full h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-12"></div>
      
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 mb-4 flex items-center justify-center">
          <img 
            src={logoImage} 
            alt="CitySeva Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl text-[#1E2A38] text-center mb-2">CitySeva</h1>
        <p className="text-lg text-[#6c757d] text-center">Serve. Solve. Succeed.</p>
      </div>

      {/* Loading indicator */}
      <div className="flex space-x-1 mb-8">
        <div className="w-2 h-2 bg-[#FF9933] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#138808] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Government attribution */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-[#6c757d]">Powered by Government of Jharkhand</p>
      </div>

      {/* Auto navigate after 3 seconds */}
      <button 
        onClick={onComplete}
        className="mt-4 px-6 py-2 bg-[#000080] text-white rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}