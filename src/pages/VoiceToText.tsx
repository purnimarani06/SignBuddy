import { useState, useRef } from "react";
import { Mic, MicOff, Languages, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceToText() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [copied, setCopied] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setText("Speech recognition is not supported in this browser. Try Chrome on Android.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === "hi" ? "hi-IN" : "en-US";

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Mic className="w-6 h-6 text-warning" /> Voice to Text
        </h1>
        <p className="text-sm text-muted-foreground">Real-time speech recognition for deaf users</p>
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

      {/* Mic button */}
      <div className="flex justify-center">
        <button
          onClick={toggleListening}
          className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
            listening
              ? "bg-destructive text-destructive-foreground scale-110 shadow-lg"
              : "bg-primary text-primary-foreground hover:scale-105"
          }`}
        >
          {listening ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
        </button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {listening ? "Listening... Speak now" : "Tap to start listening"}
      </p>

      {/* Output */}
      <div className="bg-card border border-border rounded-xl p-4 min-h-[120px] relative">
        {text ? (
          <>
            <p className="text-foreground text-sm whitespace-pre-wrap pr-8">{text}</p>
            <button onClick={copyText} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-muted">
              {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            </button>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">Transcribed text will appear here...</p>
        )}
      </div>

      {text && (
        <Button variant="outline" onClick={() => setText("")} className="w-full">
          Clear Text
        </Button>
      )}
    </div>
  );
}
