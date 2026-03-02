import { useState, useEffect, useMemo } from 'react';

interface HomeScreenProps {
  onPromptSelect: (text: string) => void;
  onConversationSelect: (id: string) => void;
  user: any;
}

export const HomeScreen = ({ onPromptSelect, onConversationSelect, user }: HomeScreenProps) => {
  const [showBrand, setShowBrand] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Brand intro — once per session
  useEffect(() => {
    const seen = sessionStorage.getItem('sangpt-brand-intro');
    if (seen) {
      setShowBrand(false);
      return;
    }
    const t1 = setTimeout(() => setFadeOut(true), 1400);
    const t2 = setTimeout(() => {
      setShowBrand(false);
      sessionStorage.setItem('sangpt-brand-intro', '1');
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const name = user?.user_metadata?.display_name || user?.email?.split('@')[0] || '';
    const nameStr = name ? `, ${name}` : '';
    if (hour >= 5 && hour < 12) return `Good morning${nameStr}`;
    if (hour >= 12 && hour < 17) return `Good afternoon${nameStr}`;
    return `Good evening${nameStr}`;
  }, [user]);

  if (showBrand) {
    return (
      <div className={`flex flex-col items-center justify-center h-full transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground animate-fade-in">
          SanGPT
        </h1>
        <p className="text-lg text-muted-foreground mt-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your AI Assistant
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <div className="text-center space-y-3 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">SanGPT</h1>
        <p className="text-muted-foreground text-lg">{greeting}</p>
        <p className="text-muted-foreground/60 text-sm mt-2">How can I help you today?</p>
      </div>
    </div>
  );
};
