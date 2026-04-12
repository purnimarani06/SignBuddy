import { useState } from "react";
import { Volume2, Play, Square, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_PHRASES = {
  en: [
    "Hello, how are you?",
    "I need help please",
    "Can you speak slowly?",
    "Where is the hospital?",
    "Thank you very much",
    "I am feeling sick",
    "Please call an ambulance",
    "My name is...",
  ],
  hi: [
    "नमस्ते, आप कैसे हैं?",
    "मुझे मदद चाहिए",
    "कृपया धीरे बोलिए",
    "अस्पताल कहाँ है?",
    "बहुत धन्यवाद",
    "मेरी तबीयत ठीक नहीं है",
    "एम्बुलेंस बुलाइए",
    "मेरा नाम... है",
  ],
};

export default function TextToVoice() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [speaking, setSpeaking] = useState(false);

  const speak = (t?: string) => {
    const utterance = new SpeechSynthesisUtterance(t || text);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-destructive" /> Text to Voice
        </h1>
        <p className="text-sm text-muted-foreground">Type or select a phrase to speak it out loud</p>
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-muted-foreground" />
        {(["en", "hi"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              lang === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {l === "en" ? "English" : "हिन्दी"}
          </button>
        ))}
      </div>

      {/* Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={lang === "en" ? "Type what you want to say..." : "जो बोलना है वो लिखें..."}
        className="w-full h-28 rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-ring focus:outline-none"
      />

      <div className="flex gap-2">
        <Button onClick={() => speak()} disabled={!text.trim() || speaking} className="flex-1 gap-2">
          <Play className="w-4 h-4" /> Speak
        </Button>
        {speaking && (
          <Button onClick={stop} variant="destructive" size="icon">
            <Square className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Quick phrases */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Quick Phrases</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUICK_PHRASES[lang].map((phrase) => (
            <button
              key={phrase}
              onClick={() => { setText(phrase); speak(phrase); }}
              className="text-left px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground hover:border-primary/30 transition-colors flex items-center gap-2"
            >
              <Volume2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
