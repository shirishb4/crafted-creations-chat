import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ShoppingBag, Palette, Package, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const WHATSAPP_NUMBER = "1234567890";
const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const initialSuggestions = [
  "Browse products",
  "Custom request",
  "How you make it",
  "Request a quote",
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 Welcome to my little creative studio! I'm here to help you find the perfect handmade piece or dream up something custom. ✨\n\nWhat would you like to explore today?",
    isBot: true,
    timestamp: new Date(),
    suggestions: initialSuggestions,
  },
];

const quickActions = [
  { icon: ShoppingBag, label: "View Products", action: "products" },
  { icon: Palette, label: "See Gallery", action: "gallery" },
  { icon: MessageCircle, label: "Order on WhatsApp", action: "whatsapp" },
  { icon: Package, label: "Custom Requests", action: "custom" },
];

type BotReply = { text: string; suggestions?: string[] };

const has = (msg: string, ...keys: string[]) =>
  keys.some((k) => msg.includes(k));

const getBotResponse = (userMessage: string): BotReply => {
  const m = userMessage.toLowerCase().trim();

  // Greetings
  if (has(m, "hello", "hi ", "hey", "namaste", "hola") || m === "hi") {
    return {
      text: "Hello there, creative soul! 🌸 So happy you stopped by. Would you like to browse my creations, request something custom, or learn how everything is made?",
      suggestions: ["Browse products", "Custom request", "How you make it"],
    };
  }

  // Thanks / bye
  if (has(m, "thank", "thanks", "thx")) {
    return {
      text: "You're so welcome! 💕 Ping me anytime — and if you're ready to place an order, WhatsApp is the fastest way to reach me.",
      suggestions: ["Chat on WhatsApp", "Browse products"],
    };
  }
  if (has(m, "bye", "goodbye", "see you")) {
    return {
      text: "Bye for now! 👋 Come back anytime — new creations drop often. ✨",
      suggestions: ["Browse products", "See gallery"],
    };
  }

  // ===== BROWSING PRODUCTS =====
  if (has(m, "browse", "products", "shop", "catalog", "catalogue", "collection", "what do you sell", "what do you make")) {
    return {
      text: "Yay, let's explore! 🎨 I create five main collections — tap one to see it:\n\n• 🖼️ Paintings\n• 🧸 Clay Miniatures\n• 📜 Paper Crafts\n• 🍾 Bottle Art\n• 🪵 Wooden Handicrafts\n\nWhich one calls to you?",
      suggestions: ["Paintings", "Clay Miniatures", "Paper Crafts", "Bottle Art", "Wooden Handicrafts"],
    };
  }

  if (has(m, "painting", "canvas", "acrylic", "oil paint", "portrait", "wall art")) {
    return {
      text: "My paintings 🖼️ are hand-finished on canvas using artist-grade acrylics and oils — florals, abstracts, portraits and custom themes. You can see the full collection on the Paintings page.\n\nWant me to open it, or shall we start a custom painting brief?",
      suggestions: ["Open Paintings", "Custom painting", "Request a quote"],
    };
  }

  if (has(m, "clay", "miniature", "figurine", "sculpt")) {
    return {
      text: "The clay miniatures 🧸 are tiny handcrafted characters in premium polymer clay — perfect for gifting, cake toppers or desk decor. Name-themed and family sets are a favorite!\n\nWant to see the collection or brief a custom miniature?",
      suggestions: ["Open Clay Miniatures", "Custom miniature", "Request a quote"],
    };
  }

  if (has(m, "paper", "quilling", "origami", "card")) {
    return {
      text: "Paper Crafts 📜 include quilled frames, layered greeting cards, shadow boxes and paper flower bouquets — all on acid-free cardstock so they last for years.",
      suggestions: ["Open Paper Crafts", "Custom paper craft", "Request a quote"],
    };
  }

  if (has(m, "bottle", "glass art", "upcycle")) {
    return {
      text: "Bottle Art 🍾 turns upcycled glass into painted lamps, planters and decor pieces — sustainable and totally one-of-a-kind. ♻️",
      suggestions: ["Open Bottle Art", "Custom bottle art", "Request a quote"],
    };
  }

  if (has(m, "wood", "wooden", "engrav", "plaque")) {
    return {
      text: "Wooden Handicrafts 🪵 are made from sustainable hardwood — hand-painted nameplates, keepsake boxes, coasters and engraved signs.",
      suggestions: ["Open Wooden Handicrafts", "Custom wooden piece", "Request a quote"],
    };
  }

  if (has(m, "gallery", "portfolio", "past work", "previous")) {
    return {
      text: "Absolutely! 🌟 The Creativity Gallery has photos of past pieces across every category — great for inspiration before you order.",
      suggestions: ["Open Gallery", "Custom request"],
    };
  }

  // ===== CUSTOM REQUESTS =====
  if (has(m, "custom", "personalize", "personalise", "bespoke", "made to order", "commission", "order")) {
    return {
      text: "I'd love to make something just for you! 💝 To prep a great custom brief, tell me:\n\n1️⃣ What type of piece? (painting, miniature, nameplate…)\n2️⃣ Occasion or theme? (wedding, birthday, anniversary…)\n3️⃣ Colors or style you love?\n4️⃣ Approx. size?\n5️⃣ When do you need it by?\n\nShare these on WhatsApp with any reference images and I'll send a quote + timeline. ✨",
      suggestions: ["Start custom on WhatsApp", "How you make it", "Turnaround time"],
    };
  }

  if (has(m, "gift", "present", "wedding", "birthday", "anniversary", "return gift")) {
    return {
      text: "Handmade gifts hit different 💐 — popular picks:\n\n• Name-themed clay miniatures\n• Personalized wooden nameplates\n• Custom portrait paintings\n• Quilled greeting cards & frames\n\nTell me the occasion and recipient on WhatsApp and I'll suggest 2–3 ideas within your budget.",
      suggestions: ["Start custom on WhatsApp", "Browse products"],
    };
  }

  // ===== PROCESS =====
  if (has(m, "how you make", "how do you make", "process", "how it's made", "handmade", "technique")) {
    return {
      text: "Here's how every piece comes to life 🌿:\n\n1️⃣ We chat about your idea and finalize a sketch/mockup\n2️⃣ I hand-craft it in the studio (no machines, no shortcuts)\n3️⃣ Quality check + protective finish\n4️⃣ Photos sent for your approval\n5️⃣ Carefully packed & shipped 📦\n\nEvery step is done by me, by hand, with a lot of love. 💕",
      suggestions: ["Turnaround time", "Materials used", "Request a quote"],
    };
  }

  if (has(m, "material", "made of", "what is it made", "paint used", "clay type", "quality")) {
    return {
      text: "Only high-quality, long-lasting materials 🌟:\n\n• Paintings — artist-grade acrylics & oils on primed canvas\n• Miniatures — premium polymer clay, oven-cured\n• Paper crafts — acid-free cardstock, fade-resistant\n• Bottle art — upcycled glass, weather-sealed paints\n• Wood — sustainably sourced hardwood, food-safe finish\n\n100% handmade, 0% mass-produced. 💚",
      suggestions: ["How you make it", "Care instructions", "Request a quote"],
    };
  }

  if (has(m, "care", "clean", "maintain", "last", "durable")) {
    return {
      text: "Care tips 🧼:\n\n• Wipe gently with a soft dry cloth\n• Keep away from direct sunlight & moisture\n• Clay pieces — handle gently, avoid drops\n• Paintings — dust with a soft brush every few weeks\n\nWith basic care, your piece will look beautiful for years. ✨",
      suggestions: ["Browse products", "Request a quote"],
    };
  }

  if (has(m, "time", "turnaround", "how long", "how many days", "when will", "eta", "ready by")) {
    return {
      text: "Timelines ⏳:\n\n• Ready-made pieces — ships in 2–3 days\n• Small custom orders — 5–7 days\n• Large paintings / detailed sets — 10–15 days\n• Rush orders — possible, message me on WhatsApp\n\nI'll always confirm an exact date before you pay. 📅",
      suggestions: ["Shipping info", "Start custom on WhatsApp"],
    };
  }

  // ===== PRICING (no numbers — direct to WhatsApp per policy) =====
  if (has(m, "price", "pricing", "cost", "how much", "rate", "charges", "quote", "budget", "afford")) {
    return {
      text: "Every piece is one-of-a-kind, so pricing depends on size, materials and detail. 💫 I share a personalized quote once I know what you'd like — no obligation!\n\nTap below to request a quote on WhatsApp with your idea and I'll reply quickly. 💬",
      suggestions: ["Request a quote", "Custom request", "Turnaround time"],
    };
  }

  if (has(m, "payment", "pay", "upi", "bank", "advance", "deposit")) {
    return {
      text: "Payments 💳: I accept UPI, bank transfer and popular wallets. Custom orders start with a small advance to reserve materials, and the balance is paid before dispatch. Full details on WhatsApp!",
      suggestions: ["Chat on WhatsApp", "Turnaround time"],
    };
  }

  // ===== SHIPPING / RETURNS =====
  if (has(m, "shipping", "delivery", "ship", "courier", "post", "dispatch")) {
    return {
      text: "Shipping 📦:\n\n• Pan-India delivery via trusted couriers\n• Bubble-wrapped + rigid packaging for fragile items\n• Tracking link shared once shipped\n• International shipping on request\n\nDelivery usually takes 5–7 business days after dispatch.",
      suggestions: ["Turnaround time", "Request a quote"],
    };
  }

  if (has(m, "return", "refund", "exchange", "damaged", "broken")) {
    return {
      text: "Since everything is handmade to order, returns aren't accepted — but if your piece arrives damaged in transit, send me photos on WhatsApp within 48 hours and I'll make it right. 🤝",
      suggestions: ["Chat on WhatsApp", "Shipping info"],
    };
  }

  // ===== CONTACT =====
  if (has(m, "contact", "whatsapp", "phone", "number", "email", "reach", "talk to")) {
    return {
      text: "The quickest way to reach me is WhatsApp 💬 — tap the button below and I'll reply personally.",
      suggestions: ["Chat on WhatsApp", "Browse products"],
    };
  }

  // Default fallback
  return {
    text: "That's a lovely question! 🌷 I can help you with:\n\n• Browsing my collections\n• Custom / personalized orders\n• Process, materials & care\n• Timelines and shipping\n• Requesting a quote\n\nPick one below, or ask away!",
    suggestions: ["Browse products", "Custom request", "How you make it", "Request a quote"],
  };
};

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

  const sendUserMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      text: trimmed,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotResponse(trimmed);
      const botResponse: Message = {
        id: Date.now() + 1,
        text: reply.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: reply.suggestions,
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = () => sendUserMessage(inputValue);

  const handleSuggestion = (label: string) => {
    // Route smart-suggestions that map to real navigation
    const l = label.toLowerCase();
    if (l.startsWith("open paintings")) {
      window.location.href = "/collections/paintings";
      setIsOpen(false);
      return;
    }
    if (l.startsWith("open clay")) {
      window.location.href = "/collections/clay-miniatures";
      setIsOpen(false);
      return;
    }
    if (l.startsWith("open paper")) {
      window.location.href = "/collections/paper-crafts";
      setIsOpen(false);
      return;
    }
    if (l.startsWith("open bottle")) {
      window.location.href = "/collections/bottle-art";
      setIsOpen(false);
      return;
    }
    if (l.startsWith("open wooden")) {
      window.location.href = "/collections/wooden-crafts";
      setIsOpen(false);
      return;
    }
    if (l.startsWith("open gallery") || l === "see gallery") {
      window.location.href = "/gallery";
      setIsOpen(false);
      return;
    }
    if (l === "chat on whatsapp") {
      window.open(waLink("Hi! I have a question about your handmade creations. 🎨"), "_blank");
      return;
    }
    if (l === "request a quote") {
      window.open(
        waLink("Hi! I'd like a quote for a handmade piece. Here's what I have in mind: "),
        "_blank",
      );
      return;
    }
    if (l === "start custom on whatsapp") {
      window.open(
        waLink(
          "Hi! I'd like to place a custom order.\n• Type of piece:\n• Occasion/theme:\n• Colors/style:\n• Size:\n• Needed by:",
        ),
        "_blank",
      );
      return;
    }
    if (l.startsWith("custom ")) {
      sendUserMessage(`I'd like a ${label.toLowerCase()}`);
      return;
    }
    if (l === "shipping info") {
      sendUserMessage("Tell me about shipping");
      return;
    }
    if (l === "materials used") {
      sendUserMessage("What materials do you use?");
      return;
    }
    if (l === "care instructions") {
      sendUserMessage("How do I care for the piece?");
      return;
    }
    if (l === "turnaround time") {
      sendUserMessage("How long does it take?");
      return;
    }
    // Default: send the suggestion as a user message so the script handles it
    sendUserMessage(label);
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
        window.open(waLink("Hi! I'd like to order one of your handmade creations. 🎨"), "_blank");
        break;
      case "custom":
        sendUserMessage("I want to make a custom request");
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
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 font-body text-sm whitespace-pre-wrap ${
                    message.isBot
                      ? "bg-card border border-border text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
              {message.isBot && message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {message.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="flex items-center gap-1 px-2.5 py-1 bg-card border border-primary/30 rounded-full text-xs font-body text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
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
