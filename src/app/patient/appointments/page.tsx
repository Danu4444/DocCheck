'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Check, Clock, Phone, BellRing, ChevronLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const upcomingAppointments = [
    {
        id: 1,
        doctor: "Dr. Emily Carter",
        specialty: "Cardiologist",
        hospital: "City General Hospital",
        date: "October 26, 2023",
        time: "11:30 AM",
        token: 12,
        liveToken: 8,
        avatar: "https://picsum.photos/seed/doc1/200/200",
        fallback: "EC"
    },
]

const pastAppointments = [
    {
        id: 2,
        doctor: "Dr. Ben Hanson",
        specialty: "Dermatologist",
        hospital: "Downtown Medical Center",
        date: "October 15, 2023",
        time: "2:00 PM",
        token: 5,
        avatar: "https://picsum.photos/seed/doc2/200/200",
        fallback: "BH"
    },
    {
        id: 3,
        doctor: "Dr. Sarah Lee",
        specialty: "Pediatrician",
        hospital: "Sunrise Clinic",
        date: "September 28, 2023",
        time: "10:00 AM",
        token: 3,
        avatar: "https://picsum.photos/seed/doc3/200/200",
        fallback: "SL"
    },
]

export default function AppointmentsPage() {
    const { toast } = useToast();
    const router = useRouter();

    const handleNotification = () => {
        toast({
            title: "It's your turn!",
            description: "Dr. Carter is ready to see you now. Token #12.",
        });

        if(window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([200, 100, 200]);
        }
    };

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><Calendar/> My Appointments</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        
        <Button onClick={handleNotification} className="mb-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <BellRing className="mr-2 h-4 w-4"/> Simulate "Your Turn" Notification
        </Button>

        <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
                 <div className="grid gap-6">
                    {upcomingAppointments.map((appt) => (
                        <Card key={appt.id} className="shadow-md">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={appt.avatar} />
                                        <AvatarFallback>{appt.fallback}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{appt.doctor}</CardTitle>
                                        <CardDescription>{appt.specialty} at {appt.hospital}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> <span>{appt.date}</span></div>
                                    <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> <span>{appt.time}</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-center">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Your Token</p>
                                        <p className="text-2xl font-bold">#{appt.token}</p>
                                    </div>
                                    <div className="bg-primary/10 p-3 rounded-lg text-center">
                                        <p className="text-sm text-primary font-semibold">Live Token</p>
                                        <p className="text-3xl font-bold text-primary">#{appt.liveToken}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <Phone className="mr-2 h-4 w-4" /> Contact Clinic
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </TabsContent>
            <TabsContent value="past">
                <div className="space-y-4">
                    {pastAppointments.map((appt) => (
                        <Card key={appt.id}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={appt.avatar} />
                                        <AvatarFallback>{appt.fallback}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{appt.doctor}</p>
                                        <p className="text-sm text-muted-foreground">{appt.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Completed</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
