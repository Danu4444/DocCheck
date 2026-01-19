import Link from 'next/link';
import { Stethoscope, LayoutDashboard, User, Settings } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';

const doctorNavItems = [
    { href: "/doctor/dashboard", icon: LayoutDashboard, label: "Dashboard", tooltip: "Dashboard" },
    { href: "/doctor/profile", icon: Settings, label: "Profile & Availability", tooltip: "Profile Settings" },
];

export default function DoctorLayout({
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
            {doctorNavItems.map((item) => (
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
                name="Dr. Emily Carter"
                email="emily.carter@doccheck.com"
                avatarUrl="https://picsum.photos/seed/doc1/200/200"
                avatarFallback="EC"
            />
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 bg-background">{children}</main>
    </SidebarProvider>
  );
}
