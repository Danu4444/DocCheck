import Link from 'next/link';
import { Stethoscope, LayoutDashboard, User, Calendar, Bot, HeartPulse, Search } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';

const patientNavItems = [
    { href: "/patient/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "Dashboard" },
    { href: "/patient/find-doctor", icon: Search, label: "Find a Doctor", tooltip: "Find a Doctor" },
    { href: "/patient/appointments", icon: Calendar, label: "My Appointments", tooltip: "Appointments" },
    { href: "/patient/medical-history", icon: HeartPulse, label: "Medical History", tooltip: "Medical History" },
    { href: "/patient/chatbot", icon: Bot, label: "AI Assistant", tooltip: "AI Assistant" },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Stethoscope className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">DocCheck</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {patientNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton tooltip={item.tooltip}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <UserNav 
                name="Jane Doe"
                email="jane.doe@example.com"
                avatarUrl="https://picsum.photos/seed/avatar1/200/200"
                avatarFallback="JD"
            />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 bg-background">{children}</main>
    </SidebarProvider>
  );
}
