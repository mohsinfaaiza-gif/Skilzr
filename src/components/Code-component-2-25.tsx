import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, Plus, X, Camera, MapPin, Briefcase } from 'lucide-react';

interface ProfileCreationProps {
  onComplete: () => void;
}

export function ProfileCreation({ onComplete }: ProfileCreationProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [step, setStep] = useState(1);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const stepTitles = {
    1: "Tell us about yourself",
    2: "What skills do you have?",
    3: "What would you like to learn?"
  };

  const stepDescriptions = {
    1: "Help others get to know you better",
    2: "Share your expertise with the community",
    3: "Discover new skills and connect with teachers"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 via-background to-accent/20 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center items-center gap-4 mb-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i <= step 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ scale: i === step ? 1.1 : 1 }}
                >
                  {i}
                </motion.div>
              ))}
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {stepTitles[step as keyof typeof stepTitles]}
            </CardTitle>
            <CardDescription className="text-lg">
              {stepDescriptions[step as keyof typeof stepDescriptions]}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center">
                  <motion.div 
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="w-24 h-24 border-4 border-primary/20">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-600/20">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Alex" 
                      className="rounded-xl border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Smith" 
                      className="rounded-xl border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About You</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us a bit about yourself, your passions, and what brings you joy..."
                    className="rounded-xl border-primary/20 focus:border-primary min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input 
                      id="location" 
                      placeholder="San Francisco, CA" 
                      className="rounded-xl border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Profession
                    </Label>
                    <Input 
                      id="profession" 
                      placeholder="Software Developer" 
                      className="rounded-xl border-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g., React, Guitar, Cooking, Photography..."
                      className="rounded-xl border-primary/20 focus:border-primary"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <Button 
                      onClick={addSkill} 
                      size="icon" 
                      className="rounded-xl bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 min-h-[120px] p-4 border border-primary/20 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                    {skills.length === 0 && (
                      <p className="text-muted-foreground text-center w-full py-8">
                        Add your skills above to share your expertise with the community
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-accent/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Include both professional and personal skills! Someone might want to learn your hobby as much as your work expertise.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      placeholder="e.g., Painting, Machine Learning, Yoga, Spanish..."
                      className="rounded-xl border-primary/20 focus:border-primary"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    />
                    <Button 
                      onClick={addInterest} 
                      size="icon" 
                      className="rounded-xl bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 min-h-[120px] p-4 border border-primary/20 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={interest}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {interest}
                          <button
                            onClick={() => removeInterest(interest)}
                            className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      </motion.div>
                    ))}
                    {interests.length === 0 && (
                      <p className="text-muted-foreground text-center w-full py-8">
                        Add skills you'd like to learn to find the perfect teachers
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">
                    🌟 <strong>Great choice!</strong> Learning new skills opens doors to amazing connections and experiences.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-xl"
              >
                Previous
              </Button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleNext}
                  className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-8"
                >
                  {step === 3 ? 'Complete Profile' : 'Next'}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}