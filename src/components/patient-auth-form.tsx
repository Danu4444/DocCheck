'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ChevronLeft, Phone, Lock, User } from 'lucide-react';
import { StepIndicator } from '@/components/step-indicator';

export function PatientAuthForm() {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'name'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isNewUser] = useState(true); // Simulate new/existing user
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Phone Number',
        description: 'Please enter a 10-digit phone number.',
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: 'OTP Sent (Simulation)',
        description: 'An OTP has been sent to your phone. Use 123456 to proceed.',
      });
    }, 1000);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
        toast({ variant: 'destructive', title: 'Invalid OTP', description: 'Please enter the code 123456.' });
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
        if (isNewUser) {
            setStep('name');
            toast({ title: 'Almost there!', description: 'Please enter your name to complete registration.' });
        } else {
            toast({ title: 'Login Successful', description: 'Welcome back!' });
            router.push('/patient/dashboard');
        }
        setIsLoading(false);
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
        toast({ variant: "destructive", title: "Invalid Name", description: "Please enter your full name." });
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
        toast({ title: "Registration Successful", description: "Your account has been created." });
        router.push('/patient/dashboard');
    }, 1000);
  }

  const handleBack = () => {
    if (step === 'name') {
      setStep('otp');
    } else if (step === 'otp') {
      setStep('phone');
      setOtp('');
    }
  };

  const renderFormContent = () => {
    switch (step) {
      case 'otp':
        return (
          <>
            <Button 
              variant="link" 
              onClick={handleBack} 
              className="px-0 mb-6 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Change Phone Number
            </Button>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">Sent to:</Label>
                <p className="text-lg font-bold">{`+91${phone}`}</p>
              </div>
              <div className="space-y-1">
                <Label htmlFor="otp" className="text-base font-medium">Enter OTP</Label>
                <p className="text-xs text-muted-foreground">Check your SMS for the OTP (demo: 123456)</p>
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
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <div className="text-center">
                <Button variant="link" className="gap-1 text-xs h-auto p-0">
                  Didn't receive OTP? <span className="underline">Resend</span>
                </Button>
              </div>
            </form>
          </>
        );
      case 'name':
         return (
            <>
                <Button 
                  variant="link" 
                  onClick={handleBack} 
                  className="px-0 mb-6 text-muted-foreground hover:text-foreground"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                        <Label className="text-xs font-semibold text-muted-foreground">Verified Phone:</Label>
                        <p className="text-lg font-bold">{`+91${phone}`}</p>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-base font-medium">Your Full Name</Label>
                        <p className="text-xs text-muted-foreground">This will be visible to doctors during consultations.</p>
                    </div>
                    <div className="space-y-2">
                        <Input
                          id="name"
                          type="text"
                          placeholder="e.g., Jane Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                          className="text-base"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading} size="lg">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isLoading ? 'Creating Account...' : 'Complete Registration'}
                    </Button>
                </form>
            </>
         );
      default: // 'phone' step
        return (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
              <p className="text-xs text-muted-foreground">We'll send you an OTP to verify your number.</p>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">+91</span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                  disabled={isLoading}
                  className="pl-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">Enter a 10-digit Indian phone number</p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading} size="lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </form>
        );
    }
  }

  return (
    <div className="mt-4 space-y-6">
      <StepIndicator 
        steps={['Phone', 'Verify OTP', 'Complete Profile']} 
        currentStep={step} 
        stepOrder={['phone', 'otp', 'name']} 
      />
      {renderFormContent()}
    </div>
  );
}
