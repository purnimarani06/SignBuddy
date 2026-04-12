import { Settings, Globe, Palette, Volume2, Info, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function SettingsPage() {
  const { dark, toggle } = useTheme();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-muted-foreground" /> Settings
        </h1>
        <p className="text-sm text-muted-foreground">Customize your SignBridge experience</p>
      </div>

      <div className="space-y-2">
        {/* Theme */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium text-foreground">Dark Mode</div>
              <div className="text-xs text-muted-foreground">Switch between light and dark themes</div>
            </div>
          </div>
          <button
            onClick={toggle}
            className={`w-12 h-7 rounded-full transition-colors ${dark ? "bg-primary" : "bg-muted"} relative`}
          >
            <div className={`w-5 h-5 bg-card rounded-full absolute top-1 transition-transform ${dark ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Language */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-accent" />
            <div>
              <div className="text-sm font-medium text-foreground">Language</div>
              <div className="text-xs text-muted-foreground">English & Hindi supported</div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">EN / HI</span>
        </div>

        {/* Voice speed */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-warning" />
            <div>
              <div className="text-sm font-medium text-foreground">Voice Speed</div>
              <div className="text-xs text-muted-foreground">Adjust text-to-speech speed</div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">Normal</span>
        </div>

        {/* About */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Info className="w-5 h-5 text-muted-foreground" />
            <div className="text-sm font-medium text-foreground">About SignBridge</div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            SignBridge is an AI-powered communication platform designed to bridge the gap between deaf/mute individuals and the hearing world. Our mission is to make communication accessible for everyone, everywhere — even without internet.
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-primary">
            <ExternalLink className="w-3 h-3" /> Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
