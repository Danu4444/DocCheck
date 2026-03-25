import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, HeartPulse, Bot, Calendar, ArrowRight, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const quickLinks = [
  {
    title: 'Find a Doctor',
    description: 'Search for specialists near you.',
    icon: Search,
    href: '/patient/find-doctor',
    color: 'from-blue-500/10 to-blue-600/10',
    iconColor: 'text-blue-600',
  },
  {
    title: 'Medical History',
    description: 'View your past consultations.',
    icon: HeartPulse,
    href: '/patient/medical-history',
    color: 'from-red-500/10 to-red-600/10',
    iconColor: 'text-red-600',
  },
  {
    title: 'AI Assistant',
    description: 'Ask questions about your health.',
    icon: Bot,
    href: '/patient/chatbot',
    color: 'from-green-500/10 to-green-600/10',
    iconColor: 'text-green-600',
  },
];

const upcomingAppointments = [
    {
        doctor: "Dr. Emily Carter",
        specialty: "Cardiologist",
        hospital: "City General Hospital",
        time: "11:30 AM",
        date: "Today",
        token: 12,
        avatar: "https://picsum.photos/seed/doc1/200/200",
        fallback: "EC",
        status: "Confirmed"
    },
    {
        doctor: "Dr. Ben Hanson",
        specialty: "Dermatologist",
        hospital: "Downtown Medical Center",
        time: "2:00 PM",
        date: "Tomorrow",
        token: 5,
        avatar: "https://picsum.photos/seed/doc2/200/200",
        fallback: "BH",
        status: "Pending"
    },
]

export default function PatientDashboard() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur-sm p-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
        </div>
        <Button variant="outline" size="icon" className="hover:bg-primary/10">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
            <h2 className="text-4xl font-bold font-headline">Welcome Back, Jane! 👋</h2>
            <p className="text-muted-foreground text-lg">Here's your health summary for today</p>
        </div>

        {/* Upcoming Appointments Section */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <Calendar className="text-primary" /> 
                Upcoming Appointments
              </h3>
              <Button variant="outline" asChild size="sm">
                <Link href="/patient/find-doctor">View All</Link>
              </Button>
            </div>
            
            <div className="grid gap-4 lg:grid-cols-2">
                {upcomingAppointments.map((appt, index) => (
                    <Card 
                      key={index} 
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
                    >
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-14 w-14 border-2 border-primary/20">
                                <AvatarImage src={appt.avatar} alt={appt.doctor} />
                                <AvatarFallback>{appt.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-bold text-lg">{appt.doctor}</p>
                                  <Badge variant={appt.status === "Confirmed" ? "default" : "secondary"} className="flex-shrink-0">
                                    {appt.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                  <MapPin className="h-3 w-3" />
                                  {appt.hospital}
                                </div>
                            </div>
                          </div>
                          <div className="border-t pt-3 flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">Token #{appt.token}</p>
                              <p className="font-semibold text-primary flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {appt.date}, {appt.time}
                              </p>
                            </div>
                            <Button asChild size="sm" variant="outline">
                              <Link href="#">Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Quick Actions Section */}
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((link) => (
                  <Card 
                    key={link.title} 
                    className={`hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer`}
                  >
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                              {link.title}
                            </CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {link.description}
                            </CardDescription>
                          </div>
                          <div className={`bg-gradient-to-br ${link.color} p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                             <link.icon className={`w-5 h-5 ${link.iconColor}`} />
                          </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button 
                          asChild 
                          variant="outline" 
                          size="sm" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                            <Link href={link.href}>
                              Go to {link.title}
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </Link>
                        </Button>
                    </CardContent>
                  </Card>
              ))}
            </div>
        </div>

        {/* Health Stats Section */}
        <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Health Stats</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Heart Rate', value: '78 bpm', unit: 'Normal', icon: '❤️' },
                { label: 'Blood Pressure', value: '120/80', unit: 'Normal', icon: '📊' },
                { label: 'Steps Today', value: '8234', unit: 'steps', icon: '👟' },
                { label: 'Water Intake', value: '6/8', unit: 'glasses', icon: '💧' },
              ].map((stat, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="text-3xl">{stat.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-green-600 font-medium mt-1">{stat.unit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}
