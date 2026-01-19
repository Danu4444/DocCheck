'use client';

import { Bot, ChevronLeft } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ChatbotPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
          <Bot /> AI Assistant
        </h1>
      </header>
      <main className="flex-1 overflow-y-auto">
        <ChatInterface />
      </main>
    </div>
  );
}
