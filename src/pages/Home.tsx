import { Link } from "react-router-dom";
import {
  Type, Hand, Mic, Volume2, GraduationCap, AlertTriangle,
  BookOpen, Sparkles, Heart, Users, Globe
} from "lucide-react";

const features = [
  { path: "/text-to-sign", label: "Text to Sign", desc: "Type text and see sign language", icon: Type, color: "bg-primary/10 text-primary" },
  { path: "/sign-to-text", label: "Sign to Text", desc: "Camera detects your gestures", icon: Hand, color: "bg-accent/10 text-accent" },
  { path: "/voice-to-text", label: "Voice to Text", desc: "Speech to text in real-time", icon: Mic, color: "bg-warning/10 text-warning" },
  { path: "/text-to-voice", label: "Text to Voice", desc: "Convert text to speech", icon: Volume2, color: "bg-destructive/10 text-destructive" },
  { path: "/learn", label: "Learn Signs", desc: "Step-by-step sign language", icon: GraduationCap, color: "bg-primary/10 text-primary" },
  { path: "/dictionary", label: "Dictionary", desc: "Search any sign gesture", icon: BookOpen, color: "bg-accent/10 text-accent" },
];

const stats = [
  { icon: Users, value: "70M+", label: "Deaf people worldwide" },
  { icon: Globe, value: "300+", label: "Sign languages exist" },
  { icon: Heart, value: "100%", label: "Offline capable" },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Communication
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
          Bridging Silence<br />& Communication
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Empowering deaf and mute individuals to communicate, learn, and live independently with AI-powered tools.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <s.icon className="w-5 h-5 mx-auto text-primary mb-1" />
            <div className="font-heading font-bold text-lg text-foreground">{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="space-y-3">
        <h2 className="font-heading font-semibold text-lg text-foreground">Core Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <Link
              key={f.path}
              to={f.path}
              className={`animate-fade-in-up stagger-${i + 1} bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all group`}
            >
              <div className={`w-10 h-10 rounded-lg ${f.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-5 h-5" />
              </div>
              <div className="font-medium text-sm text-foreground">{f.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* SOS Banner */}
      <Link
        to="/sos"
        className="block bg-destructive/10 border border-destructive/20 rounded-xl p-4 hover:bg-destructive/15 transition-colors animate-fade-in-up"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center animate-pulse-soft">
            <AlertTriangle className="w-6 h-6 text-destructive-foreground" />
          </div>
          <div>
            <div className="font-heading font-semibold text-foreground">Emergency SOS</div>
            <div className="text-xs text-muted-foreground">Quick emergency messages & voice alerts</div>
          </div>
        </div>
      </Link>

      {/* Use Cases */}
      <div className="space-y-3">
        <h2 className="font-heading font-semibold text-lg text-foreground">Real-Life Use Cases</h2>
        <div className="grid grid-cols-2 gap-2">
          {["🏥 Hospital", "🎓 Education", "🛒 Daily Life", "💼 Workplace"].map((uc) => (
            <div key={uc} className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground">
              {uc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
