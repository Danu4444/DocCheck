'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Search, Hospital, Stethoscope, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { doctors } from '@/lib/data';

export default function FindDoctorPage() {
    const { toast } = useToast();

    const handleLocationRequest = () => {
        toast({
            title: "Location Permission",
            description: "Locating nearest hospitals... (simulation)",
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    toast({
                        title: "Success!",
                        description: "Found hospitals near you.",
                    });
                },
                () => {
                     toast({
                        variant: "destructive",
                        title: "Error",
                        description: "Could not access your location.",
                    });
                }
            );
        }
    };


  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4">
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><Search/> Find a Doctor</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    <Input placeholder="Doctor name or keyword..." className="lg:col-span-2 xl:col-span-1" />
                    <Select>
                        <SelectTrigger><div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>Location</span></div></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="sf">San Francisco</SelectItem>
                            <SelectItem value="la">Los Angeles</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger><div className="flex items-center gap-2"><Hospital className="h-4 w-4"/><span>Hospital</span></div></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="h1">City General Hospital</SelectItem>
                            <SelectItem value="h2">Downtown Medical Center</SelectItem>
                            <SelectItem value="h3">Sunrise Clinic</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger><div className="flex items-center gap-2"><Briefcase className="h-4 w-4"/><span>Specialization</span></div></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cardiology">Cardiology</SelectItem>
                            <SelectItem value="dermatology">Dermatology</SelectItem>
                            <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="w-full xl:col-span-1">
                        <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                </div>
                 <Button variant="link" onClick={handleLocationRequest} className="mt-2 px-0">
                    <MapPin className="mr-2 h-4 w-4 text-primary"/> Find nearest hospitals
                 </Button>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
                <Card key={doctor.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <Avatar className="h-20 w-20 border-2 border-primary">
                                <AvatarImage src={doctor.avatar} />
                                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <CardTitle className="text-xl">{doctor.name}</CardTitle>
                                <p className="text-primary font-medium">{doctor.specialty}</p>
                                <Badge variant={doctor.available ? 'default' : 'destructive'} className="mt-2 bg-green-500 hover:bg-green-600">
                                    {doctor.available ? 'Available Today' : 'On Leave'}
                                </Badge>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-muted-foreground"><Hospital className="h-4 w-4"/> {doctor.hospital}</p>
                        <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4"/> {doctor.location}</p>
                    </CardContent>
                    <div className="p-4 pt-0">
                        <Button className="w-full" disabled={!doctor.available}>Book Token</Button>
                    </div>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
