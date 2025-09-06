import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Star, MapPin, MessageCircle, Heart } from 'lucide-react';
import { useState } from 'react';

interface SkillCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    location: string;
    profession: string;
    rating: number;
    reviewCount: number;
  };
  skill: {
    name: string;
    description: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    category: string;
  };
  onConnect: (userId: string) => void;
}

export function SkillCard({ user, skill, onConnect }: SkillCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  
  const levelColors = {
    'Beginner': 'bg-green-100 text-green-700',
    'Intermediate': 'bg-blue-100 text-blue-700',
    'Advanced': 'bg-purple-100 text-purple-700',
    'Expert': 'bg-orange-100 text-orange-700',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-600/20">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.profession}</p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setIsLiked(!isLiked)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-red-50 transition-colors"
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${
                  isLiked ? 'fill-red-400 text-red-400' : 'text-muted-foreground'
                }`} 
              />
            </motion.button>
          </div>

          {/* Skill Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-primary">{skill.name}</h4>
              <Badge className={`${levelColors[skill.level]} border-0`}>
                {skill.level}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {skill.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {user.rating} ({user.reviewCount})
              </div>
            </div>
          </div>

          {/* Category */}
          <Badge variant="outline" className="w-fit rounded-full border-primary/30 text-primary">
            {skill.category}
          </Badge>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => onConnect(user.id)}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Connect
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl border-primary/30 hover:bg-primary/10"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}