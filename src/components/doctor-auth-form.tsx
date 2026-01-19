'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

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
      if (isSignUp && (name.trim().length < 2 || license.trim().length < 5)) {
        toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all fields for sign up.' });
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        toast({ title: isSignUp ? 'Registration Successful' : 'Login Successful' });
        router.push('/doctor/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-4 flex items-center justify-center space-x-2">
        <Label htmlFor="auth-mode" className={!isSignUp ? 'text-primary font-semibold' : ''}>
          Login
        </Label>
        <Switch id="auth-mode" checked={isSignUp} onCheckedChange={setIsSignUp} />
        <Label htmlFor="auth-mode" className={isSignUp ? 'text-primary font-semibold' : ''}>
          Sign Up
        </Label>
      </div>

      <form onSubmit={handleAuthAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="doctor@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading || otpSent} />
        </div>

        {isSignUp && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Dr. John Doe" value={name} onChange={(e) => setName(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" type="text" placeholder="e.g., MD123456" value={license} onChange={(e) => setLicense(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license-file">License Document</Label>
              <Button asChild variant="outline" className="w-full justify-start text-muted-foreground">
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Proof
                  <Input id="license-file" type="file" className="sr-only" disabled={isLoading} />
                </label>
              </Button>
            </div>
          </>
        )}

        {otpSent && (
          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input id="otp" type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required disabled={isLoading} maxLength={6} />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {otpSent ? (isSignUp ? 'Create Account' : 'Login') : 'Send OTP'}
        </Button>
      </form>
    </div>
  );
}
