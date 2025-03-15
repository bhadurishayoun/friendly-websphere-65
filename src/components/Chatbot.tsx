
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Mic, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm Shayoun's AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

// Bot responses with keyword matching
const botResponses = [
  {
    keywords: ["hi", "hello", "hey"],
    response: "Hello! How can I help you learn more about Shayoun today?",
  },
  {
    keywords: ["experience", "work", "job", "internship"],
    response: "Shayoun has experience as a Founder's Office Intern at Pync, a Summer Research Intern at IIT BHU, and a Data Analytics Intern at GUESSS India. Would you like to know more about a specific role?",
  },
  {
    keywords: ["education", "study", "degree", "university", "college"],
    response: "Shayoun is currently pursuing an MBA with a focus on Data Science & AI at IIT Mandi. He holds a BTech in Data Science & AI from SRM University, Lucknow. Is there something specific about his academic background you'd like to know?",
  },
  {
    keywords: ["skills", "tech", "technologies", "programming"],
    response: "Shayoun is skilled in Python, Machine Learning, SQL, EDA, Power BI, Agile, Jira, IBM Cloud, Hadoop, and Data Visualization. Which skill would you like to learn more about?",
  },
  {
    keywords: ["project", "projects"],
    response: "Shayoun has worked on several projects including Student Gap Analysis, Face Recognition of Partially Occluded Objects, Weather Forecasting, Diversity Inclusion Dashboard, and a Virtual Assistant Chatbot. Would you like details on any of these?",
  },
  {
    keywords: ["contact", "email", "connect", "reach"],
    response: "You can reach Shayoun via email at mb24043@students.iitmandi.ac.in or connect with him on LinkedIn (Shayoun Bhaduri) and GitHub (bhadurishayoun).",
  },
  {
    keywords: ["blog", "article", "write"],
    response: "Shayoun writes about AI-driven fraud detection models, Power BI and data visualization, and business analytics case studies. Is there a specific topic you're interested in?",
  },
  {
    keywords: ["thank", "thanks"],
    response: "You're welcome! Feel free to ask if you have any other questions about Shayoun.",
  },
  {
    keywords: ["resume", "cv"],
    response: "You can download Shayoun's resume from the Contact section. Would you like me to take you there?",
  },
  {
    keywords: ["navigate", "go to", "open", "show", "take me"],
    response: "I can help you navigate to different sections. Just tell me which section you'd like to visit: Home, About, Projects, Blog, or Contact.",
  },
  {
    keywords: ["home", "main"],
    response: "I'll take you to the Home section right away!",
    action: "navigate",
    destination: "home"
  },
  {
    keywords: ["about"],
    response: "Let me show you the About section where you can learn more about Shayoun!",
    action: "navigate",
    destination: "about"
  },
  {
    keywords: ["project", "projects"],
    response: "I'll take you to the Projects section to see Shayoun's impressive work!",
    action: "navigate",
    destination: "projects"
  },
  {
    keywords: ["blog", "blogs", "articles"],
    response: "Let me show you Shayoun's Blog section!",
    action: "navigate",
    destination: "blog"
  },
  {
    keywords: ["contact"],
    response: "I'll take you to the Contact section so you can reach out to Shayoun!",
    action: "navigate",
    destination: "contact"
  },
];

// Get bot response based on user input
const getBotResponse = (message: string): { response: string; action?: string; destination?: string } => {
  // Convert message to lowercase for better matching
  const lowerMessage = message.toLowerCase();
  
  // Try to match against our predefined responses
  for (const item of botResponses) {
    if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return {
        response: item.response,
        action: item.action,
        destination: item.destination
      };
    }
  }
  
  // Fallback response
  return {
    response: "I'm not sure I understand. Would you like to know about Shayoun's experience, education, skills, projects, or how to contact him?"
  };
};

// Helper function to scroll to section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    return true;
  }
  return false;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Speech recognition setup
  const recognition = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Auto send the voice message
        setTimeout(() => handleSendMessage(transcript), 500);
      };
      
      recognition.current.onend = () => {
        setIsListening(false);
      };
      
      recognition.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error("Couldn't understand speech. Please try again.");
      };
    }
    
    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  // Speech synthesis
  const speak = (text: string) => {
    if (isMuted || !text) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice to a nice female voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google UK English Female')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Set pitch and rate for natural sound
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.rate = 1.0; // Normal speed
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initialize voice synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
      };
    }
  }, []);

  const toggleSpeech = () => {
    if (isListening) {
      if (recognition.current) {
        recognition.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognition.current) {
        try {
          recognition.current.start();
          setIsListening(true);
        } catch (error) {
          console.error('Speech recognition error', error);
          toast.error("Couldn't start speech recognition. Please try again.");
        }
      } else {
        toast.error("Speech recognition not supported in your browser.");
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (voiceInput?: string) => {
    const messageText = voiceInput || input;
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Process response
    setTimeout(() => {
      const botReply = getBotResponse(messageText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botReply.response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Speak the response
      speak(botReply.response);
      
      // Handle navigation action if present
      if (botReply.action === "navigate" && botReply.destination) {
        setTimeout(() => {
          // Try to scroll to section first
          const success = scrollToSection(botReply.destination!);
          
          // If no scroll target found, close chatbot
          if (!success) {
            setIsOpen(false);
          }
        }, 1500);
      }
    }, 1000);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Show toast when opening chatbot
      toast.info("Chat with Shayoun's AI Assistant!", {
        description: "Ask me anything about Shayoun's background or projects.",
      });
    }
  };

  const renderQuickReplies = () => {
    const quickReplies = [
      "Tell me about Shayoun's projects",
      "What skills does Shayoun have?",
      "How can I contact Shayoun?",
      "What's Shayoun's education background?"
    ];
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {quickReplies.map(reply => (
          <button
            key={reply}
            onClick={() => {
              setInput(reply);
              handleSendMessage(reply);
            }}
            className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Chatbot trigger button */}
      <button 
        onClick={toggleChatbot}
        className="chatbot-trigger"
        aria-label="Open chatbot"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      
      {/* Chatbot dialog */}
      <div 
        className={`fixed bottom-8 right-8 w-full max-w-md z-50 transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <Card className="shadow-2xl border-primary/10">
          {/* Chatbot header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-xl">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-medium">Shayoun's AI Assistant</h3>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-primary-foreground hover:bg-primary/90"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChatbot}
                className="text-primary-foreground hover:bg-primary/90"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages container */}
          <div className="p-4 h-96 overflow-y-auto bg-secondary/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block text-right">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-card border rounded-2xl px-4 py-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce delay-150"></div>
                    <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick replies */}
            {messages.length <= 2 && renderQuickReplies()}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={isListening ? "Listening..." : "Type your message..."}
                className={`flex-1 ${isListening ? 'border-primary' : ''}`}
                disabled={isListening}
              />
              <Button 
                onClick={toggleSpeech} 
                variant={isListening ? "default" : "outline"}
                className={`${isListening ? 'bg-primary text-primary-foreground animate-pulse' : ''}`}
                title="Voice input"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleSendMessage()} className="bg-primary">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Voice status indicator */}
            {(isListening || isSpeaking) && (
              <div className="text-xs text-center mt-2 text-muted-foreground">
                {isListening && "Listening to your voice..."}
                {isSpeaking && "Speaking..."}
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Chatbot;
