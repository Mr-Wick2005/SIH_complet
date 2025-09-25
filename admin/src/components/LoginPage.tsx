import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Building2, Shield, UserCheck, Eye, EyeOff, Info } from "lucide-react";
import citySeveLogo from "figma:asset/764af81e046bc093cfa2314c551298051f1fc754.png";
import { authenticateUser, User } from "../lib/auth";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = authenticateUser(email, password);
    if (user) {
      onLogin(user);
    } else {
      setError("Invalid email or password");
    }
    
    setIsLoading(false);
  };

  const demoCredentials = [
    {
      role: "Department Admin",
      email: "admin@civic.gov", 
      password: "admin123",
      icon: Building2,
      color: "bg-blue-50 text-[#1E2A38] border-blue-200"
    },
    {
      role: "Field Worker",
      email: "worker@civic.gov",
      password: "worker123", 
      icon: UserCheck,
      color: "bg-green-50 text-[#1E2A38] border-green-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <img src={citySeveLogo} alt="CitySeva" className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-[#1E2A38]">CitySeva Admin</h1>
          <p className="text-[#6c757d]">Municipal Issue Management Dashboard</p>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <div className="w-4 h-1 bg-[#FF9933] rounded"></div>
            <div className="w-4 h-1 bg-[#138808] rounded"></div>
            <div className="w-4 h-1 bg-[#000080] rounded"></div>
          </div>
          <p className="mt-3 text-sm text-[#6c757d]">Government of India • Digital India Initiative</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-lg border-t-4 border-t-[#FF9933]">
          <CardHeader>
            <CardTitle className="text-[#1E2A38]">Administrator Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1E2A38]">Official Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@cityseva.gov"
                  className="border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1E2A38]">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secure password"
                    className="border-gray-300 focus:border-[#FF9933] focus:ring-[#FF9933]"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#6c757d]" /> : <Eye className="w-4 h-4 text-[#6c757d]" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-[#dc3545]">{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-[#138808] hover:bg-[#117507] text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Secure Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-0 shadow-lg border-l-4 border-l-[#000080]">
          <CardHeader>
            <CardTitle className="text-lg text-[#1E2A38] flex items-center">
              <Info className="w-4 h-4 mr-2 text-[#000080]" />
              Demo Access Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-[#6c757d] mb-3">
              For demonstration purposes only. In production, use official government credentials.
            </p>
            {demoCredentials.map((cred, index) => {
              const Icon = cred.icon;
              return (
                <div
                  key={index}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.password);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${cred.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#1E2A38]">{cred.role}</p>
                      <p className="text-xs text-[#6c757d]">{cred.email}</p>
                    </div>
                    <Badge variant="outline" className="text-xs border-[#FF9933] text-[#FF9933]">
                      Try Demo
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-center text-xs text-[#6c757d]">
          <p className="flex items-center justify-center">
            <Shield className="w-3 h-3 mr-1" />
            Powered by Digital India • Secure Government Portal
          </p>
          <p className="mt-1">Department Admins manage reports, Field Workers handle ground operations</p>
        </div>
      </div>
    </div>
  );
}