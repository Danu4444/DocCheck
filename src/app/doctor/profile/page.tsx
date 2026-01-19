'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, ToggleRight, Hash, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { doctors } from '@/lib/data';

const currentDoctor = doctors[0];

export default function DoctorProfilePage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isAvailable, setIsAvailable] = useState(currentDoctor.available);
    const [tokenLimit, setTokenLimit] = useState(50);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Changes Saved",
                description: "Your profile and availability have been updated."
            })
        }, 1000);
    }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2"><Settings/> Profile & Availability</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSaveChanges}>
            <div className="grid gap-8 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ToggleRight/> Daily Status</CardTitle>
                        <CardDescription>Control your availability and patient queue for today.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <Label htmlFor="availability-switch" className="font-semibold">Available for Appointments</Label>
                                <p className="text-sm text-muted-foreground">
                                    Turn this on to appear in patient searches today.
                                </p>
                            </div>
                            <Switch 
                                id="availability-switch" 
                                checked={isAvailable}
                                onCheckedChange={setIsAvailable}
                            />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="token-limit" className="flex items-center gap-2 font-semibold"><Hash className="h-4 w-4"/> Daily Token Limit</Label>
                             <Input 
                                id="token-limit" 
                                type="number" 
                                value={tokenLimit}
                                onChange={(e) => setTokenLimit(Number(e.target.value))}
                                className="max-w-xs"
                                min="0"
                             />
                              <p className="text-sm text-muted-foreground">
                                    Set the maximum number of tokens you will issue today.
                                </p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                     <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>This information is visible to patients.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={currentDoctor.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input id="specialty" defaultValue={currentDoctor.specialty} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="hospital">Hospital / Clinic</Label>
                            <Input id="hospital" defaultValue={currentDoctor.hospital} />
                        </div>
                    </CardContent>
                </Card>
                 <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                       <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>
        </form>
      </main>
    </div>
  );
}
