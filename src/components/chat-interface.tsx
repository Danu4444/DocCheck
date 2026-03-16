// @ts-nocheck
'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { getChatbotResponse } from '@/app/actions';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI health assistant. How can I help you today? Please remember, I'm not a substitute for a real doctor.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //To check a input field have charecters and make sure loaging
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getChatbotResponse(input);
      if (result.success) {
        const assistantMessage: Message = { role: 'assistant', content: result.response };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not get a response.',
      });
      setMessages((prev) => prev.slice(0, -1)); // Remove user message if AI fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-5rem)] bg-gradient-to-t from-background/50 to-transparent">
      <ScrollArea className="flex-1 mb-4" ref={scrollAreaRef}>
        <div className="space-y-4 p-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex items-end gap-3 animate-fadeIn ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border-2 border-accent flex-shrink-0">
                  <AvatarFallback className="bg-accent/20"><Bot className="h-5 w-5 text-accent"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-3 text-sm transition-smooth shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-none'
                    : 'bg-card border border-border rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border-2 border-primary flex-shrink-0">
                  <AvatarFallback className="bg-primary/20"><User className="h-5 w-5 text-primary"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-3 animate-fadeIn">
              <Avatar className="h-8 w-8 border-2 border-accent flex-shrink-0">
                 <AvatarFallback className="bg-accent/20"><Bot className="h-5 w-5 text-accent"/></AvatarFallback>
              </Avatar>
              <div className="max-w-xs md:max-w-md rounded-2xl p-4 bg-card border border-border rounded-bl-none flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t bg-card/95 backdrop-blur-sm p-4 space-y-3 shadow-lg">
        {/* Quick suggestions */}
        {messages.length === 1 && (
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={() => setInput("What should I do if I have a fever?")}
              className="text-xs p-2 rounded-lg border border-border hover:bg-primary/10 transition-smooth text-left"
            >
              💡 Fever symptoms
            </button>
            <button 
              type="button"
              onClick={() => setInput("When should I see a doctor?")}
              className="text-xs p-2 rounded-lg border border-border hover:bg-primary/10 transition-smooth text-left"
            >
              ⚕️ Doctor advice
            </button>
          </div>
        )}

        {/* Input form */}
        <div className="flex items-center gap-2 bg-background rounded-lg border border-border p-1 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-smooth">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your health..."
            className="flex-1 border-0 bg-transparent focus:outline-none focus:ring-0"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="sm" 
            className="mr-1"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Disclaimer: This AI assistant is for informational purposes only and is not a substitute for professional medical advice.
        </p>
      </form>
    </div>
  );
}
