'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, ChevronLeft } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { StepIndicator } from '@/components/step-indicator';

export function DoctorAuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      // Send OTP
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast({ variant: 'destructive', title: 'Invalid Email' });
        return;
      }
       if (isSignUp && (name.trim().length < 2 || license.trim().length < 5)) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all fields for sign up.' });
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
        toast({ title: 'OTP Sent', description: 'An OTP has been sent to your email (use 123456).' });
      }, 1000);
    } else {
      // Verify OTP and Login/Sign Up
      if (otp !== '123456') {
        toast({ variant: 'destructive', title: 'Invalid OTP' });
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        toast({ title: isSignUp ? 'Registration Successful' : 'Login Successful' });
        router.push('/doctor/dashboard');
      }, 1000);
    }
  };

  const handleBack = () => {
      setOtpSent(false);
      setOtp('');
  }

  if (otpSent) {
    return (
         <div className="mt-4 space-y-6">
            <StepIndicator 
              steps={isSignUp ? ['Email', 'Details', 'Verify'] : ['Email', 'Verify']} 
              currentStep="otp" 
              stepOrder={isSignUp ? ['email', 'details', 'otp'] : ['email', 'otp']} 
            />
            <Button 
              variant="link" 
              onClick={handleBack} 
              className="px-0 -mt-4 text-muted-foreground hover:text-foreground"
            >
                <ChevronLeft className="mr-2 h-4 w-4" /> Change Email
            </Button>
            <form onSubmit={handleAuthAction} className="space-y-6">
                 <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground">Sent to:</Label>
                    <p className="text-lg font-bold">{email}</p>
                </div>
                {isSignUp && (
                    <>
                         <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                            <Label className="text-xs font-semibold text-muted-foreground">Registering as:</Label>
                            <p className="text-lg font-bold">{name}</p>
                            <p className="text-sm text-muted-foreground">License: {license}</p>
                        </div>
                    </>
                )}
                <div className="space-y-1">
                    <Label htmlFor="otp" className="text-base font-medium">Enter OTP</Label>
                    <p className="text-xs text-muted-foreground">Check your email for the OTP (demo: 123456)</p>
                </div>
                <div className="space-y-2">
                    <Input 
                      id="otp" 
                      type="text" 
                      placeholder="000000" 
                      value={otp} 
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                      required 
                      disabled={isLoading} 
                      maxLength={6} 
                      className="text-center text-2xl tracking-widest font-bold"
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Verifying...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>
            </form>
        </div>
    )
  }

  return (
    <div className="mt-4 space-y-6">
        {!isSignUp && (
          <StepIndicator 
            steps={['Email', 'Verify']} 
            currentStep="email" 
            stepOrder={['email', 'otp']} 
          />
        )}
        {isSignUp && (
          <StepIndicator 
            steps={['Email', 'Details', 'Verify']} 
            currentStep="email" 
            stepOrder={['email', 'details', 'otp']} 
          />
        )}
        <div className="mb-4 flex items-center justify-between bg-secondary/50 rounded-lg p-4">
            <div>
              <Label className={`text-sm font-semibold transition ${!isSignUp ? 'text-primary' : 'text-muted-foreground'}`}>
                  Sign In
              </Label>
              <p className="text-xs text-muted-foreground">Existing doctor</p>
            </div>
            <Switch id="auth-mode" checked={isSignUp} onCheckedChange={setIsSignUp} />
            <div className="text-right">
              <Label className={`text-sm font-semibold transition ${isSignUp ? 'text-primary' : 'text-muted-foreground'}`}>
                  Register
              </Label>
              <p className="text-xs text-muted-foreground">New doctor</p>
            </div>
        </div>

      <form onSubmit={handleAuthAction} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
          <p className="text-xs text-muted-foreground">We'll verify your identity with this email</p>
        </div>
        <div className="space-y-2">
          <Input 
            id="email" 
            type="email" 
            placeholder="doctor@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
            className="text-base"
          />
        </div>

        {isSignUp && (
          <>
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold">Professional Information</h3>
              <div className="space-y-1">
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <p className="text-xs text-muted-foreground">As it appears on your license</p>
              </div>
              <div className="space-y-2">
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Dr. John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  disabled={isLoading}
                  className="text-base"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="license" className="text-base font-medium">Medical License Number</Label>
                <p className="text-xs text-muted-foreground">We'll verify this with medical board</p>
              </div>
              <div className="space-y-2">
                <Input 
                  id="license" 
                  type="text" 
                  placeholder="e.g., MD123456" 
                  value={license} 
                  onChange={(e) => setLicense(e.target.value)} 
                  required 
                  disabled={isLoading}
                  className="text-base"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="license-file" className="text-base font-medium">License Document</Label>
                <p className="text-xs text-muted-foreground">PDF or image (max 10MB)</p>
              </div>
              <div className="space-y-2">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-start text-muted-foreground hover:text-foreground"
                >
                  <label className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload License
                    <Input 
                      id="license-file" 
                      type="file" 
                      className="sr-only" 
                      disabled={isLoading}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </Button>
              </div>
            </div>
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading} size="lg">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground">
        <p className="leading-relaxed">
          By registering, you agree that DocCheck will verify your credentials with the medical board.
        </p>
      </div>
    </div>
  );
}
