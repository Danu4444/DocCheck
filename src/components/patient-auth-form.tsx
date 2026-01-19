'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function PatientAuthForm() {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'name'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
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
      // In a real app, you'd check if the phone number exists.
      // Here, we'll randomly decide if it's a new user.
      const isNewUser = Math.random() > 0.5;
      setStep(isNewUser ? 'name' : 'otp');
      setIsLoading(false);
      toast({
        title: 'OTP Sent',
        description: 'An OTP has been sent to your phone (use 123456).',
      });
    }, 1000);
  };
  
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '123456') {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect.',
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/patient/dashboard');
    }, 1000);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
        toast({
            variant: "destructive",
            title: "Invalid Name",
            description: "Please enter your full name.",
        });
        return;
    }
    if (otp !== '123456') {
        toast({
            variant: "destructive",
            title: "Invalid OTP",
            description: "The OTP you entered is incorrect.",
        });
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
        toast({
            title: "Registration Successful",
            description: "Your account has been created.",
        });
        router.push('/patient/dashboard');
    }, 1000);
  }

  return (
    <div className="mt-4">
      {step === 'phone' && (
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
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
                <Label>Phone Number</Label>
                <p className="text-sm text-muted-foreground">{phone}</p>
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
            Login
          </Button>
        </form>
      )}

      {step === 'name' && (
        <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
                <Label>Phone Number</Label>
                <p className="text-sm text-muted-foreground">{phone}</p>
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
            <div className="space-y-2">
                <Label htmlFor="otp-reg">OTP</Label>
                <Input
                id="otp-reg"
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
                Register
            </Button>
        </form>
      )}
    </div>
  );
}
