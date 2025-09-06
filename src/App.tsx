import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { LoginSignup } from './components/LoginSignup';
import { ProfileCreation } from './components/ProfileCreation';
import { SkillMatching } from './components/SkillMatching';
import { Chat } from './components/Chat';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [user, setUser] = useState(null);

  const handleAuthComplete = () => {
    setUser({ authenticated: true });
    setCurrentScreen('profile');
  };

  const handleProfileComplete = () => {
    setCurrentScreen('skills');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <LoginSignup onComplete={handleAuthComplete} />;
      case 'profile':
        return <ProfileCreation onComplete={handleProfileComplete} />;
      case 'skills':
        return <SkillMatching />;
      case 'chat':
        return <Chat />;
      default:
        return <LoginSignup onComplete={handleAuthComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/8 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation - Only show after authentication */}
      {user && (
        <Navigation 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen} 
        />
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut" 
          }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}