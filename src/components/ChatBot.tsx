import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ShoppingBag, Palette, Package } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 Welcome to my creative studio! How can I help you today? ✨",
    isBot: true,
    timestamp: new Date(),
  },
];

const quickActions = [
  { icon: ShoppingBag, label: "View Products", action: "products" },
  { icon: Palette, label: "See Gallery", action: "gallery" },
  { icon: MessageCircle, label: "Order on WhatsApp", action: "whatsapp" },
  { icon: Package, label: "Custom Requests", action: "custom" },
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (isOpen && messages.length > 1) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
      return "Great question! 🎨 Prices vary based on the artwork, size, and materials used. For pricing details, please message me on WhatsApp and I'll be happy to help! 💬";
    }
    
    if (lowerMessage.includes("custom") || lowerMessage.includes("personalize") || lowerMessage.includes("order")) {
      return "I'd love to create something special just for you! 💝\n\nCustom orders include:\n• Personalized paintings\n• Name-themed miniatures\n• Gift sets for special occasions\n\nShare your idea on WhatsApp and let's make it happen! ✨";
    }
    
    if (lowerMessage.includes("material") || lowerMessage.includes("made of") || lowerMessage.includes("what is")) {
      return "All my creations use high-quality materials! 🌟\n\n• Paintings: Artist-grade acrylics & oils\n• Miniatures: Premium polymer clay\n• Paper crafts: Acid-free cardstock\n• Wood: Sustainable hardwood\n\nEverything is 100% handmade with love! 💕";
    }
    
    if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery") || lowerMessage.includes("time")) {
      return "Shipping info 📦:\n\n• Delivery: 5-7 business days\n• Secure packaging for all items\n• Pan-India delivery available!\n\nMessage me on WhatsApp for details! 🚚";
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello there, creative soul! 🌸 So happy you stopped by! What brings you to my little art studio today? Feel free to explore or ask me anything! ✨";
    }
    
    return "That's a wonderful question! 🎨 For the best experience, I recommend chatting with me directly on WhatsApp where I can help you in detail.\n\nOr use the quick buttons below to explore! 👇";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "products":
        window.location.href = "/#shop";
        setIsOpen(false);
        break;
      case "gallery":
        window.location.href = "/gallery";
        setIsOpen(false);
        break;
      case "whatsapp":
        window.open("https://wa.me/1234567890", "_blank");
        break;
      case "custom":
        const customMessage: Message = {
          id: Date.now(),
          text: "I want to make a custom request",
          isBot: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, customMessage]);
        setIsTyping(true);
        setTimeout(() => {
          const response: Message = {
            id: Date.now() + 1,
            text: "I'd love to create something unique for you! 💝\n\nTo discuss your custom order:\n1. Think about what you'd like (gift, decor, etc.)\n2. Any specific colors or themes?\n3. When do you need it by?\n\nLet's chat on WhatsApp for personalized assistance! 💬",
            isBot: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, response]);
          setIsTyping(false);
        }, 1000);
        break;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-float flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ background: "var(--gradient-warm)" }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-7 h-7 text-primary-foreground" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose rounded-full flex items-center justify-center text-xs text-rose-foreground font-bold animate-bounce-gentle">
          1
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-card rounded-3xl shadow-float border border-border overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border" style={{ background: "var(--gradient-warm)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center text-xl">
                🎨
              </div>
              <div>
                <h3 className="font-heading text-xl text-primary-foreground font-bold">Creative Helper</h3>
                <p className="text-xs text-primary-foreground/70 font-body">Usually replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-card/20 rounded-full flex items-center justify-center text-primary-foreground hover:bg-card/30 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 font-body text-sm whitespace-pre-wrap ${
                  message.isBot
                    ? "bg-card border border-border text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-t border-border bg-card flex gap-2 flex-wrap">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-xs font-medium font-body text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <action.icon className="w-3.5 h-3.5" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-muted rounded-full text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              style={{ background: "var(--gradient-warm)" }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
