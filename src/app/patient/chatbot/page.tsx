'use client';

import { Bot, ChevronLeft, Zap } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ChatbotPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur-sm p-4 flex items-center gap-4 shadow-sm">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="hover:bg-primary/10">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
              <Bot className="text-white h-5 w-5" />
            </div>
            AI Health Assistant
          </h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Zap className="h-3 w-3" /> Powered by doctor-reviewed AI
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <ChatInterface />
      </main>
    </div>
  );
}
