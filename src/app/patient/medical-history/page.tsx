'use client';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeartPulse, Upload, FileText, ChevronLeft } from 'lucide-react';
import { medicalHistory } from '@/lib/data';
import { PrescriptionUploader } from '@/components/prescription-uploader';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function MedicalHistoryPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><HeartPulse/> Medical History</h1>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Prescription
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Prescription</DialogTitle>
                    <DialogDescription>
                        Upload an image of your prescription to get an AI-powered summary.
                    </DialogDescription>
                </DialogHeader>
                <PrescriptionUploader />
            </DialogContent>
        </Dialog>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="relative pl-8">
            <div className="absolute left-0 top-0 h-full w-0.5 bg-border -translate-x-1/2 ml-4"></div>
            {medicalHistory.map((item, index) => (
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
            ))}
        </div>
      </main>
    </div>
  );
}
