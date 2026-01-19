'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ChevronLeft } from 'lucide-react';
import { useAuth, useFirestore } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// This allows us to attach the verifier to the window object without TypeScript errors.
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

export function PatientAuthForm() {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'name'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  useEffect(() => {
    if (auth && !window.recaptchaVerifier) {
      // The container MUST be visible for reCAPTCHA to work. We can make it invisible with CSS.
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, this callback is fired.
        },
      });
    }
  }, [auth]);

  const handleSendOtp = async (e: React.FormEvent) => {
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
    try {
      const verifier = window.recaptchaVerifier!;
      const formattedPhoneNumber = `+91${phone}`; // Assuming Indian number for this demo.
      const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier);
      setConfirmationResult(result);
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: 'An OTP has been sent to your phone.',
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to send OTP',
        description: 'Please check your phone number and try again. You might need to refresh the page.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || otp.length !== 6) {
        toast({ variant: 'destructive', title: 'Invalid OTP', description: 'Please enter a valid 6-digit OTP.' });
        return;
    }
    setIsLoading(true);
    try {
        const userCredential = await confirmationResult.confirm(otp);
        const user = userCredential.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(firestore, "patients", user.uid));

        if (userDoc.exists()) {
            // Existing user
            toast({ title: 'Login Successful', description: 'Welcome back!' });
            router.push('/patient/dashboard');
        } else {
            // New user, ask for name
            setStep('name');
            toast({ title: 'Almost there!', description: 'Please enter your name to complete registration.' });
        }
    } catch (error) {
        console.error("Error verifying OTP: ", error);
        toast({ variant: 'destructive', title: 'Invalid OTP', description: 'The OTP you entered is incorrect.' });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
        toast({ variant: "destructive", title: "Invalid Name", description: "Please enter your full name." });
        return;
    }
    setIsLoading(true);
    const user = auth.currentUser;
    if (!user) {
        toast({ variant: 'destructive', title: 'Authentication Error', description: 'Please start the login process again.' });
        setStep('phone');
        setIsLoading(false);
        return;
    }

    try {
        await setDoc(doc(firestore, "patients", user.uid), {
            id: user.uid,
            name: name,
            phoneNumber: user.phoneNumber,
        });
        toast({ title: "Registration Successful", description: "Your account has been created." });
        router.push('/patient/dashboard');
    } catch (error) {
        console.error("Error registering user: ", error);
        toast({ variant: 'destructive', title: 'Registration Failed', description: 'Could not save your information.' });
        setIsLoading(false);
    }
  }

  const handleBack = () => {
    setStep('phone');
    setOtp('');
    setName('');
  }

  return (
    <div className="mt-4">
      {/* This div is required for the invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>
      
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
      )}

      {step === 'name' && (
        <>
        <Button variant="link" onClick={handleBack} className="px-0 mb-4 text-muted-foreground" disabled>
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
      )}
    </div>
  );
}
