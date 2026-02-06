import { memo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const TypingIndicator = memo(() => {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <Avatar className="h-7 w-7 bg-primary flex-shrink-0 mt-1">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">S</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1.5 py-4 px-1">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '150ms' }} />
        <span className="typing-dot" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';
