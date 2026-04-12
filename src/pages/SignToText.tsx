import { useState } from "react";
import { Hand, Camera, CameraOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const DETECTED_GESTURES = [
  { gesture: "👋", text: "Hello", confidence: 94 },
  { gesture: "👍", text: "Yes / Good", confidence: 91 },
  { gesture: "🙏", text: "Thank you", confidence: 88 },
  { gesture: "✌️", text: "Peace / Two", confidence: 92 },
  { gesture: "🤟", text: "I love you", confidence: 87 },
  { gesture: "👆", text: "One / Point", confidence: 95 },
];

export default function SignToText() {
  const [cameraOn, setCameraOn] = useState(false);
  const [detected, setDetected] = useState<typeof DETECTED_GESTURES[0] | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const simulateDetection = () => {
    const gesture = DETECTED_GESTURES[Math.floor(Math.random() * DETECTED_GESTURES.length)];
    setDetected(gesture);
    setHistory((prev) => [gesture.text, ...prev].slice(0, 10));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Hand className="w-6 h-6 text-accent" /> Sign to Text
        </h1>
        <p className="text-sm text-muted-foreground">Show sign gestures to the camera and get text output</p>
      </div>

      {/* Camera preview */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="aspect-video bg-muted flex items-center justify-center relative">
          {cameraOn ? (
            <>
              <div className="text-center space-y-2">
                <div className="text-6xl animate-pulse-soft">📹</div>
                <p className="text-sm text-muted-foreground">Camera active — show a gesture</p>
              </div>
              {/* Detection overlay */}
              {detected && (
                <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur rounded-xl p-3 flex items-center gap-3 border border-primary/30">
                  <span className="text-3xl">{detected.gesture}</span>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{detected.text}</div>
                    <div className="text-xs text-muted-foreground">Confidence: {detected.confidence}%</div>
                  </div>
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-3">
              <CameraOff className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Camera is off</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          onClick={() => { setCameraOn(!cameraOn); if (cameraOn) setDetected(null); }}
          variant={cameraOn ? "destructive" : "default"}
          className="flex-1 gap-2"
        >
          {cameraOn ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          {cameraOn ? "Stop Camera" : "Start Camera"}
        </Button>
        {cameraOn && (
          <Button onClick={simulateDetection} variant="outline" className="gap-2">
            <Zap className="w-4 h-4" /> Simulate Detection
          </Button>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">Detection History</h3>
          <div className="bg-card border border-border rounded-xl p-3 space-y-1.5">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground">{i + 1}.</span>
                <span className="text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        ⚡ Powered by lightweight AI model — works offline
      </p>
    </div>
  );
}
