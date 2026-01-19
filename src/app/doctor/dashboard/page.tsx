'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Phone, UserCheck, Users, SkipForward, FileSearch } from 'lucide-react';
import { appointments } from '@/lib/data';

export default function DoctorDashboardPage() {
    const [liveToken, setLiveToken] = useState(7);
    const totalTokens = appointments.length;

    const nextPatient = () => {
        if (liveToken < totalTokens) {
            setLiveToken(liveToken + 1);
        }
    }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4">
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><LayoutDashboard/> Dashboard</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Patient Queue</CardTitle>
                    <CardDescription>
                        {totalTokens - liveToken} patients waiting.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Token</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.filter(a => a.token >= liveToken).map((appt) => (
                                <TableRow key={appt.token} className={appt.token === liveToken ? 'bg-primary/10' : ''}>
                                    <TableCell className="font-bold text-lg">#{appt.token}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={appt.patient.avatar}/>
                                                <AvatarFallback>{appt.patient.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{appt.patient.name}</p>
                                                <p className="text-sm text-muted-foreground">{appt.patient.age} years old</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button asChild variant="outline" size="icon">
                                            <Link href={`/doctor/patient/${appt.patient.id}`}>
                                                <FileSearch className="h-4 w-4" />
                                                <span className="sr-only">Inspect History</span>
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Phone className="h-4 w-4"/>
                                            <span className="sr-only">Call</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Now Serving</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-8xl font-bold text-primary mb-4">#{liveToken}</p>
                    <Button className="w-full" onClick={nextPatient}>
                        <SkipForward className="mr-2 h-4 w-4"/> Next Patient
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Session Stats</CardDescription>
                    <CardTitle className="text-3xl">{totalTokens} Tokens</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <UserCheck className="h-6 w-6 text-green-500" />
                        <div>
                            <p className="text-lg font-bold">{liveToken - 1}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-orange-500" />
                        <div>
                            <p className="text-lg font-bold">{totalTokens - liveToken + 1}</p>
                            <p className="text-sm text-muted-foreground">Waiting</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
