import { useState } from "react";
import { AlertTriangle, Volume2, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMERGENCY_MESSAGES = [
  { text: "I need help! Please assist me.", icon: "🆘", category: "General" },
  { text: "Please call an ambulance!", icon: "🚑", category: "Medical" },
  { text: "I am feeling very sick.", icon: "🤒", category: "Medical" },
  { text: "I am deaf/mute. Please help me.", icon: "🤟", category: "General" },
  { text: "I am lost. Can you help me find my way?", icon: "📍", category: "General" },
  { text: "Please call the police.", icon: "🚔", category: "Safety" },
  { text: "There is a fire! Help!", icon: "🔥", category: "Safety" },
  { text: "I am having chest pain.", icon: "💔", category: "Medical" },
  { text: "I cannot breathe properly.", icon: "😰", category: "Medical" },
  { text: "Someone is following me.", icon: "⚠️", category: "Safety" },
];

export default function SOS() {
  const [spoken, setSpoken] = useState<string | null>(null);

  const speakMessage = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
    setSpoken(text);
    setTimeout(() => setSpoken(null), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-destructive" /> Emergency SOS
        </h1>
        <p className="text-sm text-muted-foreground">Tap any message to speak it out loud immediately</p>
      </div>

      {/* Big SOS button */}
      <button
        onClick={() => speakMessage("Help! I am a deaf person and I need immediate assistance! Please help me!")}
        className="w-full py-8 rounded-2xl bg-destructive text-destructive-foreground flex flex-col items-center gap-2 hover:bg-destructive/90 transition-colors active:scale-95"
      >
        <AlertTriangle className="w-12 h-12 animate-pulse-soft" />
        <span className="text-2xl font-heading font-bold">SOS</span>
        <span className="text-xs opacity-80">Tap for emergency voice alert</span>
      </button>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" className="flex-col h-auto py-3 gap-1">
          <Phone className="w-5 h-5 text-primary" />
          <span className="text-[10px]">Call 112</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-3 gap-1">
          <MapPin className="w-5 h-5 text-accent" />
          <span className="text-[10px]">Share Location</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-3 gap-1">
          <MessageCircle className="w-5 h-5 text-warning" />
          <span className="text-[10px]">Send SMS</span>
        </Button>
      </div>

      {/* Emergency messages */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Quick Emergency Messages</h3>
        {EMERGENCY_MESSAGES.map((msg) => (
          <button
            key={msg.text}
            onClick={() => speakMessage(msg.text)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              spoken === msg.text
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <span className="text-2xl">{msg.icon}</span>
            <span className="text-sm text-foreground flex-1">{msg.text}</span>
            <Volume2 className={`w-4 h-4 shrink-0 ${spoken === msg.text ? "text-primary" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
