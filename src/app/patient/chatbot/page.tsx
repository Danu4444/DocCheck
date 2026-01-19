import { Bot } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-card p-4">
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
