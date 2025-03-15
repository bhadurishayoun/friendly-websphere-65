
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
];

const getBotResponse = (message: string): string => {
  // Convert message to lowercase for better matching
  const lowerMessage = message.toLowerCase();
  
  // Try to match against our predefined responses
  for (const item of botResponses) {
    if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return item.response;
    }
  }
  
  // Fallback response
  return "I'm not sure I understand. Would you like to know about Shayoun's experience, education, skills, projects, or how to contact him?";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChatbot}
              className="text-primary-foreground hover:bg-primary/90"
            >
              <X className="h-4 w-4" />
            </Button>
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
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-primary">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Chatbot;
