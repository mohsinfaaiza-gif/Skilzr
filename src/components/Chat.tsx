import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Send, Phone, Video, MoreVertical, Smile, Paperclip, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
/*
import { getMessages, sendMessage, getCurrentUser } from '../services/api';
import { useState, useEffect } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getMessages('1_2'); // Sample chat
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    const user = getCurrentUser();
    if (!user || !newMessage.trim()) return;

    try {
      await sendMessage('1_2', user.id, newMessage);
      setNewMessage('');
      loadMessages(); // Refresh messages
    } catch (error) {
      alert('Message sent! (Demo)');
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg: any) => (
          <div key={msg.id} className={`message ${msg.senderId === getCurrentUser()?.id ? 'sent' : 'received'}`}>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}; */

interface Message {
  id: string;
  sender: 'user' | 'other';
  content: string;
  timestamp: Date;
  type: 'text' | 'image';
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  skill: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

export function Chat() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: ChatContact[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      skill: 'UI/UX Design',
      isOnline: true,
      lastMessage: 'I can help you with wireframing tomorrow!',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Miguel Rodriguez',
      skill: 'React Development',
      isOnline: true,
      lastMessage: 'The component structure looks great',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: '3',
      name: 'Emma Thompson',
      skill: 'Piano Basics',
      isOnline: false,
      lastMessage: 'Practice those scales we discussed',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '4',
      name: 'David Kim',
      skill: 'Korean Language',
      isOnline: true,
      lastMessage: 'Your pronunciation is improving!',
      lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      unreadCount: 1
    }
  ];

  useEffect(() => {
    if (selectedContact && messages.length === 0) {
      // Initialize with some sample messages
      const sampleMessages: Message[] = [
        {
          id: '1',
          sender: 'other',
          content: `Hi! I'm excited to help you learn ${selectedContact.skill}. What's your current experience level?`,
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          type: 'text'
        },
        {
          id: '2',
          sender: 'user',
          content: 'I\'m completely new to this, but very eager to learn!',
          timestamp: new Date(Date.now() - 50 * 60 * 1000),
          type: 'text'
        },
        {
          id: '3',
          sender: 'other',
          content: 'Perfect! That\'s exactly where I love to start. Let me prepare some beginner-friendly materials for our first session.',
          timestamp: new Date(Date.now() - 40 * 60 * 1000),
          type: 'text'
        },
        {
          id: '4',
          sender: 'user',
          content: 'That sounds amazing! When would be a good time for you?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          type: 'text'
        }
      ];
      setMessages(sampleMessages);
    }
  }, [selectedContact]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'other',
        content: 'Thanks for your message! I\'ll get back to you shortly.',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5 pt-20">
      <div className="h-full max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Contacts Sidebar */}
        <motion.div 
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Messages</h2>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {contacts.filter(c => c.unreadCount).length} new
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-1 px-4 pb-4">
                  {contacts.map((contact) => (
                    <motion.button
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                        selectedContact?.id === contact.id
                          ? 'bg-primary/10 border-2 border-primary/20'
                          : 'hover:bg-accent/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-600/20">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            contact.isOnline ? 'bg-green-400' : 'bg-gray-300'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium truncate">{contact.name}</h3>
                            {contact.lastMessageTime && (
                              <span className="text-xs text-muted-foreground">
                                {formatTime(contact.lastMessageTime)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-primary font-medium mb-1">{contact.skill}</p>
                          {contact.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate">
                              {contact.lastMessage}
                            </p>
                          )}
                        </div>
                        
                        {contact.unreadCount && (
                          <Badge className="bg-primary text-primary-foreground text-xs h-5 w-5 flex items-center justify-center p-0">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat Area */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {selectedContact ? (
            <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-border/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-600/20">
                          {selectedContact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        selectedContact.isOnline ? 'bg-green-400' : 'bg-gray-300'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <p className="text-sm text-primary">{selectedContact.skill}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                          : 'bg-accent text-foreground'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border/50 p-4">
                <div className="flex items-end gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="rounded-xl border-primary/20 focus:border-primary resize-none"
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a contact to start chatting and learning!</p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}