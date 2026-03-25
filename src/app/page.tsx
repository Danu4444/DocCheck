'use client';

import { useRouter } from 'next/navigation';
import { Stethoscope, ChevronLeft, Heart, Shield, Zap } from 'lucide-react';
import { PatientAuthForm } from '@/components/patient-auth-form';
import { DoctorAuthForm } from '@/components/doctor-auth-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Back Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute top-4 left-4 z-10 hover:bg-primary/10" 
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Go back</span>
      </Button>

      {/* Main Content */}
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-lg">
              <Stethoscope className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              DocCheck
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Connect with healthcare professionals. Manage your health journey with ease.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto w-full max-w-md">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Health First</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Secure</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Fast</p>
            </div>
          </div>

          {/* Auth Card */}
          <Card className="w-full shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Get Started</CardTitle>
              <CardDescription>
                Choose your role to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="patient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="patient" className="text-base">
                    Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="text-base">
                    Doctor
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="patient" className="mt-0">
                  <PatientAuthForm />
                </TabsContent>
                <TabsContent value="doctor" className="mt-0">
                  <DoctorAuthForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground space-y-2">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
            <p className="flex gap-4 justify-center">
              <Button variant="link" className="h-auto p-0 text-xs">Privacy</Button>
              <span>•</span>
              <Button variant="link" className="h-auto p-0 text-xs">Terms</Button>
              <span>•</span>
              <Button variant="link" className="h-auto p-0 text-xs">Support</Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
