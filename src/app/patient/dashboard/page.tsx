import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, HeartPulse, Bot, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const quickLinks = [
  {
    title: 'Find a Doctor',
    description: 'Search for specialists near you.',
    icon: Search,
    href: '/patient/find-doctor',
  },
  {
    title: 'Medical History',
    description: 'View your past consultations.',
    icon: HeartPulse,
    href: '/patient/medical-history',
  },
  {
    title: 'AI Assistant',
    description: 'Ask questions about your health.',
    icon: Bot,
    href: '/patient/chatbot',
  },
];

const upcomingAppointments = [
    {
        doctor: "Dr. Emily Carter",
        specialty: "Cardiologist",
        hospital: "City General Hospital",
        time: "11:30 AM",
        token: 12,
        avatar: "https://picsum.photos/seed/doc1/200/200",
        fallback: "EC"
    },
    {
        doctor: "Dr. Ben Hanson",
        specialty: "Dermatologist",
        hospital: "Downtown Medical Center",
        time: "Tomorrow, 2:00 PM",
        token: 5,
        avatar: "https://picsum.photos/seed/doc2/200/200",
        fallback: "BH"
    },
]

export default function PatientDashboard() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-8">
            <h2 className="text-3xl font-bold font-headline mb-2">Welcome Back, Jane!</h2>
            <p className="text-muted-foreground">Here's your health summary for today.</p>
        </div>

        <div className="grid gap-8">
            <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Calendar className="text-primary"/> Upcoming Appointments</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    {upcomingAppointments.map((appt, index) => (
                        <Card key={index} className="flex items-center p-4 gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={appt.avatar} alt={appt.doctor} />
                                <AvatarFallback>{appt.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-bold">{appt.doctor}</p>
                                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                                <p className="text-sm text-muted-foreground">{appt.hospital}</p>
                            </div>
                            <div className="text-right">
                                <Badge variant="secondary" className="mb-2">Token #{appt.token}</Badge>
                                <p className="font-semibold text-primary">{appt.time}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {quickLinks.map((link) => (
                    <Card key={link.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                        <div className="bg-primary/10 p-2 rounded-lg">
                           <link.icon className="w-5 h-5 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                            <Link href={link.href}>Go <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}
