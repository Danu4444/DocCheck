'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, ChevronLeft, FileText, User } from 'lucide-react';
import { medicalHistory, patients } from '@/lib/data';

export default function PatientInspectionPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.patientId as string;

  const patient = patients.find(p => p.id.toString() === patientId);
  const history = medicalHistory.filter(h => h.patientId.toString() === patientId);

  if (!patient) {
    return (
        <div className="flex flex-col h-full">
            <header className="border-b bg-card p-4 flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold font-headline">Patient Not Found</h1>
            </header>
            <main className="flex-1 flex items-center justify-center">
                <p>The requested patient could not be found.</p>
            </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><HeartPulse/> Patient Medical History</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={patient.avatar} />
                        <AvatarFallback>{patient.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="flex items-center gap-2 text-2xl"><User /> {patient.name}</CardTitle>
                        <CardDescription>{patient.age} years old</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Consultation History</h2>
        <div className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-4"></div>
            {history.length > 0 ? history.map((item, index) => (
                <div key={item.id} className="mb-10 relative">
                    <div className="absolute -left-4 top-1 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center ring-8 ring-background">
                       <Avatar className="h-7 w-7">
                            <AvatarImage src={item.doctor.avatar} />
                            <AvatarFallback>{item.doctor.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                       </Avatar>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{item.diagnosis}</CardTitle>
                            <CardDescription>Consultation with {item.doctor.name} on {item.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <h4 className="font-semibold mb-2">Prescription Summary</h4>
                           <div className="text-sm p-3 bg-muted rounded-md space-y-1">
                            {item.prescription.map((med, i) => (
                                <p key={i}><FileText className="inline h-4 w-4 mr-2 text-muted-foreground"/>{med}</p>
                            ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            )) : (
                <Card>
                    <CardContent className="p-6">
                        <p>No medical history found for this patient.</p>
                    </CardContent>
                </Card>
            )}
        </div>
      </main>
    </div>
  );
}
