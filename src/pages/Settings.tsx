import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-center gap-4 p-4">
          <Avatar className="h-16 w-16 bg-gradient-to-br from-ai-blue to-ai-purple">
            <AvatarFallback className="bg-gradient-to-br from-ai-blue to-ai-purple text-white text-xl font-medium">
              {user?.email?.charAt(0).toUpperCase() || 'W'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Pro Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-ai-light-blue to-ai-purple p-6">
          <h3 className="text-lg font-semibold mb-2">Do more with Copilot Pro</h3>
          <p className="text-sm mb-4 opacity-90">Get Copilot Pro</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
            Upgrade
          </Button>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
            onClick={() => navigate('/settings')}
          >
            <span className="text-base">Set Copilot as your Assistant</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium">
                NEW
              </span>
              <ChevronRight className="h-5 w-5" />
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
            onClick={() => navigate('/settings')}
          >
            <span className="text-base">Account</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
          >
            <span className="text-base">Manage memory</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
          >
            <span className="text-base">Voice settings</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="flex items-center justify-between h-auto py-4 px-4">
            <span className="text-base">Dark mode</span>
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
          >
            <span className="text-base">Give feedback</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
          >
            <span className="text-base">Take the latest survey</span>
            <ChevronRight className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-xl"
          >
            <span className="text-base">About</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="ghost"
          className="w-full text-base py-4 rounded-xl"
          onClick={handleSignOut}
        >
          Sign out
        </Button>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 pt-4 text-sm text-muted-foreground">
          <button className="hover:text-foreground transition-colors">Privacy</button>
          <button className="hover:text-foreground transition-colors">Terms of use</button>
          <button className="hover:text-foreground transition-colors">FAQ</button>
        </div>
      </div>
    </div>
  );
}
