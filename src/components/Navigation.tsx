import { Users, MessageCircle, User, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

export function Navigation({ currentScreen, onScreenChange }: NavigationProps) {
  const navItems = [
    { id: 'auth', label: 'Welcome', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <motion.nav 
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-lg rounded-full px-2 py-2 shadow-lg border border-primary/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <motion.div key={item.id} className="relative">
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onScreenChange(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                  layoutId="activeIndicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ x: '-50%' }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}