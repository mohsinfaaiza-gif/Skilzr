import { useState } from 'react';
import { motion } from 'motion/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { SkillCard } from './SkillCard';
import { Search, Filter, TrendingUp, Users, BookOpen, Palette, Code, Music, Languages, Dumbbell } from 'lucide-react';



export function SkillMatching() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: BookOpen, color: 'bg-primary' },
    { id: 'technology', name: 'Technology', icon: Code, color: 'bg-blue-500' },
    { id: 'creative', name: 'Creative', icon: Palette, color: 'bg-purple-500' },
    { id: 'music', name: 'Music', icon: Music, color: 'bg-green-500' },
    { id: 'languages', name: 'Languages', icon: Languages, color: 'bg-orange-500' },
    { id: 'fitness', name: 'Fitness', icon: Dumbbell, color: 'bg-red-500' },
  ];

  const skillOffers = [
    {
      user: {
        id: '1',
        name: 'Sarah Chen',
        avatar: '',
        location: 'San Francisco, CA',
        profession: 'UX Designer',
        rating: 4.9,
        reviewCount: 28
      },
      skill: {
        name: 'UI/UX Design',
        description: 'Learn the fundamentals of user interface and user experience design. From wireframing to prototyping, I\'ll guide you through the complete design process.',
        level: 'Expert' as const,
        category: 'Creative'
      }
    },
    {
      user: {
        id: '2',
        name: 'Miguel Rodriguez',
        avatar: '',
        location: 'Austin, TX',
        profession: 'Software Engineer',
        rating: 4.8,
        reviewCount: 42
      },
      skill: {
        name: 'React Development',
        description: 'Master modern React development with hooks, context, and state management. Perfect for beginners wanting to build dynamic web applications.',
        level: 'Advanced' as const,
        category: 'Technology'
      }
    },
    {
      user: {
        id: '3',
        name: 'Emma Thompson',
        avatar: '',
        location: 'London, UK',
        profession: 'Music Teacher',
        rating: 5.0,
        reviewCount: 35
      },
      skill: {
        name: 'Piano Basics',
        description: 'Start your musical journey with piano fundamentals. Learn to read music, proper finger positioning, and play your first songs.',
        level: 'Beginner' as const,
        category: 'Music'
      }
    },
    {
      user: {
        id: '4',
        name: 'David Kim',
        avatar: '',
        location: 'Seoul, South Korea',
        profession: 'Language Instructor',
        rating: 4.7,
        reviewCount: 56
      },
      skill: {
        name: 'Korean Language',
        description: 'Learn Korean from a native speaker! We\'ll cover Hangul, basic grammar, and conversational skills to get you speaking confidently.',
        level: 'Intermediate' as const,
        category: 'Languages'
      }
    },
    {
      user: {
        id: '5',
        name: 'Lisa Anderson',
        avatar: '',
        location: 'Vancouver, CA',
        profession: 'Yoga Instructor',
        rating: 4.9,
        reviewCount: 67
      },
      skill: {
        name: 'Beginner Yoga',
        description: 'Discover the peace and strength of yoga practice. Learn foundational poses, breathing techniques, and mindfulness practices.',
        level: 'Beginner' as const,
        category: 'Fitness'
      }
    },
    {
      user: {
        id: '6',
        name: 'Alex Johnson',
        avatar: '',
        location: 'New York, NY',
        profession: 'Data Scientist',
        rating: 4.6,
        reviewCount: 23
      },
      skill: {
        name: 'Python Programming',
        description: 'Learn Python from scratch or improve your existing skills. Cover data structures, algorithms, and practical applications.',
        level: 'Intermediate' as const,
        category: 'Technology'
      }
    }
  ];

  const filteredSkills = skillOffers.filter(offer => {
    const matchesSearch = offer.skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           offer.skill.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (userId: string) => {
    console.log('Connecting with user:', userId);
    // Handle connection logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/10 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Skills
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with passionate teachers and learn something new today
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">2,547</span>
            </div>
            <p className="text-sm text-muted-foreground">Active Teachers</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">1,234</span>
            </div>
            <p className="text-sm text-muted-foreground">Skills Available</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">89%</span>
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for skills, teachers, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-primary/30 hover:bg-primary/10">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? `${category.color} text-white shadow-lg` 
                      : 'bg-white/80 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-primary/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredSkills.map((offer, index) => (
            <motion.div
              key={offer.user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillCard
                user={offer.user}
                skill={offer.skill}
                onConnect={handleConnect}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">No skills found</h3>
              <p className="text-muted-foreground">Try adjusting your search or browse different categories</p>
              <Button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}