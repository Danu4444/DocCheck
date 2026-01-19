'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ChevronLeft } from 'lucide-react';

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
            <Button variant="link" onClick={handleBack} className="px-0 mb-4 text-muted-foreground">
                <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <p className="text-sm font-bold">{`+91${phone}`}</p>
                </div>
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={isLoading}
                  maxLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
            </form>
          </>
        );
      case 'name':
         return (
            <>
                <Button variant="link" onClick={handleBack} className="px-0 mb-4 text-muted-foreground">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <p className="text-sm font-bold">{`+91${phone}`}</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                </form>
            </>
         );
      default: // 'phone' step
        return (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g., 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send OTP
            </Button>
          </form>
        );
    }
  }

  return (
    <div className="mt-4">
      {renderFormContent()}
    </div>
  );
}
