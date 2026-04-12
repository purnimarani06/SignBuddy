import { useState } from "react";
import { Type, Play, RotateCcw, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE_SIGNS: Record<string, string[]> = {
  hello: ["👋", "🤚", "✋"],
  "how are you": ["☝️", "🤟", "👆", "🫵"],
  "thank you": ["🙏", "👐"],
  help: ["✊", "👆"],
  yes: ["👊", "👍"],
  no: ["✌️", "🤞", "👎"],
  please: ["🤲", "🙏"],
  sorry: ["✊", "🔄", "💓"],
  water: ["🤟", "👄"],
  food: ["🤌", "👄"],
  doctor: ["🤚", "💓", "✋"],
};

export default function TextToSign() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [playing, setPlaying] = useState(false);
  const [currentSigns, setCurrentSigns] = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  const handleTranslate = () => {
    const key = text.toLowerCase().trim();
    const signs = SAMPLE_SIGNS[key] || ["🤷"];
    setCurrentSigns(signs);
    setPlaying(true);
    setActiveIdx(0);
    signs.forEach((_, i) => {
      setTimeout(() => setActiveIdx(i), i * 800);
    });
    setTimeout(() => {
      setPlaying(false);
      setActiveIdx(-1);
    }, signs.length * 800 + 400);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Type className="w-6 h-6 text-primary" /> Text to Sign Language
        </h1>
        <p className="text-sm text-muted-foreground">Type text and watch the AI avatar perform sign language</p>
      </div>

      {/* Avatar area */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center justify-center min-h-[240px]">
        {currentSigns.length > 0 ? (
          <div className="flex items-center gap-4">
            {currentSigns.map((s, i) => (
              <div
                key={i}
                className={`text-5xl transition-all duration-300 ${
                  i === activeIdx ? "scale-125 opacity-100" : "scale-90 opacity-40"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className="text-6xl animate-float">🧑‍🦱</div>
            <p className="text-sm text-muted-foreground">AVA — Your AI Sign Language Avatar</p>
            <p className="text-xs text-muted-foreground">Type a word below to see the sign</p>
          </div>
        )}
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-muted-foreground" />
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            lang === "en" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("hi")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            lang === "hi" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          हिन्दी
        </button>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={lang === "en" ? 'Try: "hello", "thank you", "help"...' : 'लिखें: "नमस्ते", "धन्यवाद"...'}
          className="w-full h-24 rounded-xl border border-input bg-background px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-ring focus:outline-none"
        />
        <div className="flex gap-2">
          <Button onClick={handleTranslate} disabled={!text.trim() || playing} className="flex-1 gap-2">
            <Play className="w-4 h-4" /> Translate to Sign
          </Button>
          <Button variant="outline" onClick={() => { setText(""); setCurrentSigns([]); }} size="icon">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick phrases */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">Quick Phrases</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(SAMPLE_SIGNS).map((phrase) => (
            <button
              key={phrase}
              onClick={() => setText(phrase)}
              className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors capitalize"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
