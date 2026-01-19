'use client';

import { useRouter } from 'next/navigation';
import { Stethoscope, ChevronLeft } from 'lucide-react';
import { PatientAuthForm } from '@/components/patient-auth-form';
import { DoctorAuthForm } from '@/components/doctor-auth-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Button variant="outline" size="icon" className="absolute top-4 left-4" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Go back</span>
      </Button>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl font-bold">DocCheck</CardTitle>
          <CardDescription>Your trusted partner in healthcare.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">Patient</TabsTrigger>
              <TabsTrigger value="doctor">Doctor</TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <PatientAuthForm />
            </TabsContent>
            <TabsContent value="doctor">
              <DoctorAuthForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
