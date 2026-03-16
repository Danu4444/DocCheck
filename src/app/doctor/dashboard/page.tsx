'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, Phone, UserCheck, Users, SkipForward, FileSearch, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { appointments } from '@/lib/data';

export default function DoctorDashboardPage() {
    const [liveToken, setLiveToken] = useState(7);
    const totalTokens = appointments.length;
    const completedTokens = liveToken - 1;
    const waitingTokens = totalTokens - liveToken + 1;
    const avgConsultationTime = 15; // minutes

    const nextPatient = () => {
        if (liveToken < totalTokens) {
            setLiveToken(liveToken + 1);
        }
    }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur-sm p-4 shadow-sm">
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
          <LayoutDashboard className="text-primary"/>
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Anderson</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          {/* Stats Cards */}
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Total Tokens</p>
                  <p className="text-3xl font-bold">{totalTokens}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold">{completedTokens}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{Math.round((completedTokens / totalTokens) * 100)}% done</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Waiting</p>
                  <p className="text-3xl font-bold">{waitingTokens}</p>
                  <p className="text-xs text-orange-600 font-medium mt-1">~{waitingTokens * avgConsultationTime} min wait</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Patient Queue - Main */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Patient Queue</CardTitle>
                    <CardDescription>
                      Current consultation: Token #{liveToken}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-auto">Live</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead className="hidden sm:table-cell">Age</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.filter(a => a.token >= liveToken).slice(0, 5).map((appt) => (
                        <TableRow 
                          key={appt.token} 
                          className={`transition-colors ${appt.token === liveToken ? 'bg-primary/15 border-l-4 border-l-primary' : ''} hover:bg-muted/50`}
                        >
                          <TableCell className="font-bold text-lg">
                            <Badge className={appt.token === liveToken ? '' : 'variant-secondary'}>
                              #{appt.token}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={appt.patient.avatar}/>
                                <AvatarFallback>{appt.patient.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{appt.patient.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                            {appt.patient.age} years
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/doctor/patient/${appt.patient.id}`}>
                                  <FileSearch className="h-3.5 w-3.5" />
                                  <span className="hidden sm:inline ml-1">History</span>
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Phone className="h-3.5 w-3.5"/>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Showing 5 of {totalTokens - liveToken + 1} waiting patients
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Now Serving & Stats */}
          <div className="space-y-6">
            {/* Now Serving Card */}
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg">Now Serving</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-7xl font-bold text-primary text-center tracking-tight">
                    #{liveToken}
                  </p>
                  {liveToken <= totalTokens && (
                    <div className="text-center space-y-1">
                      <p className="font-semibold">{appointments[liveToken - 1]?.patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {appointments[liveToken - 1]?.patient.age} • {appointments[liveToken - 1]?.reason}
                      </p>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={nextPatient} 
                  disabled={liveToken >= totalTokens}
                  className="w-full"
                  size="lg"
                >
                  <SkipForward className="mr-2 h-4 w-4"/> 
                  {liveToken >= totalTokens ? 'Session Complete' : 'Next Patient'}
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Mark Completed
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Consultations Done</span>
                  </div>
                  <span className="font-bold">{completedTokens}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium">Avg. Time</span>
                  </div>
                  <span className="font-bold">{avgConsultationTime} min</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Messages</span>
                  </div>
                  <span className="font-bold">3</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
