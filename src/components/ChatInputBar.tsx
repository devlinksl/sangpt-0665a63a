import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Image, 
  Camera, 
  FileText, 
  Send,
  Sparkles,
  Square,
} from 'lucide-react';
import { SpeechToText } from '@/components/SpeechToText';
import { cn } from '@/lib/utils';
import { useHaptics } from '@/hooks/useHaptics';

interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachment: (type: 'image' | 'camera' | 'file') => void;
  onModelSelect: () => void;
  onRecordingChange: (isRecording: boolean) => void;
  onTranscription: (text: string) => void;
  isLoading: boolean;
  isRecording: boolean;
  isStoppable: boolean;
  onStop: () => void;
  disabled?: boolean;
}

export const ChatInputBar = ({
  value,
  onChange,
  onSend,
  onAttachment,
  onModelSelect,
  onRecordingChange,
  onTranscription,
  isLoading,
  isRecording,
  isStoppable,
  onStop,
  disabled
}: ChatInputBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendLockRef = useRef(false);
  const { lightTap, mediumTap } = useHaptics();
  
  const showActions = isFocused || value.length > 0;

  // Unlock send when loading finishes
  useEffect(() => {
    if (!isLoading) {
      sendLockRef.current = false;
    }
  }, [isLoading]);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [value]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !sendLockRef.current) {
        handleSendClick();
      }
    }
  }, [value]);

  const handleFileInput = (type: 'image' | 'camera' | 'file') => {
    lightTap();
    onAttachment(type);
  };

  const handleSendClick = () => {
    mediumTap();
    if (isLoading && isStoppable) {
      onStop();
    } else if (value.trim() && !sendLockRef.current) {
      // Lock via ref (no re-render, instant)
      sendLockRef.current = true;
      onSend();
    }
  };

  const isInputDisabled = disabled || isRecording;
  const isSendDisabled = (!value.trim() && !isLoading) || (isLoading && !isStoppable);

  return (
    <div className="w-full max-w-3xl mx-auto px-3">
      {/* Main glass container */}
      <div className="relative rounded-[28px] bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden gpu-accelerated">
        {/* Textarea area */}
        <div className="px-4 pt-4 pb-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Anything...."
            disabled={isInputDisabled}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 text-base resize-none outline-none min-h-[28px] max-h-[150px] leading-relaxed touch-target"
            rows={1}
          />
        </div>
        
        {/* Action bar */}
        <div className="px-3 pb-3 pt-1">
          <div className="flex items-center justify-between">
            {/* Left side - action buttons */}
            <div 
              className={cn(
                "flex items-center gap-1 transition-all duration-200 ease-out",
                showActions 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-2 pointer-events-none"
              )}
            >
              <button
                onClick={() => handleFileInput('image')}
                disabled={isInputDisabled}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none touch-target"
                type="button"
              >
                <Image className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleFileInput('camera')}
                disabled={isInputDisabled}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none touch-target"
                type="button"
              >
                <Camera className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => handleFileInput('file')}
                disabled={isInputDisabled}
                className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none touch-target"
                type="button"
              >
                <FileText className="h-5 w-5" />
              </button>
              
              <div className="flex items-center justify-center">
                <SpeechToText 
                  onTranscription={(text) => {
                    onTranscription(text);
                    onRecordingChange(false);
                  }}
                  disabled={isInputDisabled}
                  onRecordingChange={onRecordingChange}
                />
              </div>
              
              <button
                onClick={() => { lightTap(); onModelSelect(); }}
                disabled={isInputDisabled}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors active:scale-95 ml-1 disabled:opacity-50 disabled:pointer-events-none touch-target"
                type="button"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>SanGPT</span>
              </button>
            </div>
            
            {/* Right side - send button: NEVER shows spinner */}
            <Button
              onClick={handleSendClick}
              disabled={isSendDisabled}
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full shadow-md touch-target transition-transform duration-150",
                isLoading && isStoppable
                  ? "bg-destructive hover:bg-destructive/90"
                  : value.trim()
                    ? "bg-primary hover:bg-primary/90 scale-100"
                    : "bg-primary/50 scale-95 opacity-60"
              )}
            >
              {isLoading && isStoppable ? (
                <Square className="h-3.5 w-3.5 text-destructive-foreground fill-current" />
              ) : (
                <Send className="h-4 w-4 text-primary-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
