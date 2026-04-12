import { useState } from "react";
import { Fingerprint } from "lucide-react";

type ScanPhase = "idle" | "scanning" | "done";

const FingerprintScanner = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<ScanPhase>("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase("done");
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 60);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Outer glow rings */}
        {phase === "scanning" && (
          <>
            <div className="absolute inset-[-20px] rounded-full border-2 border-primary/20 animate-pulse-ring" />
            <div className="absolute inset-[-40px] rounded-full border border-primary/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
          </>
        )}

        {/* Scanner container */}
        <button
          onClick={startScan}
          disabled={phase !== "idle"}
          className={`relative w-44 h-44 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer
            ${phase === "idle" ? "bg-secondary hover:bg-secondary/80 border-2 border-primary/30 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]" : ""}
            ${phase === "scanning" ? "bg-secondary border-2 border-primary shadow-[var(--shadow-glow)]" : ""}
            ${phase === "done" ? "bg-primary/20 border-2 border-primary shadow-[var(--shadow-glow)]" : ""}
          `}
        >
          {/* Scan line */}
          {phase === "scanning" && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan-line" />
            </div>
          )}

          <Fingerprint
            className={`w-20 h-20 transition-colors duration-500
              ${phase === "idle" ? "text-primary/60" : ""}
              ${phase === "scanning" ? "text-primary" : ""}
              ${phase === "done" ? "text-primary" : ""}
            `}
          />
        </button>
      </div>

      {/* Progress bar */}
      {phase === "scanning" && (
        <div className="w-52 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <p className="text-muted-foreground text-sm font-medium">
        {phase === "idle" && "Tap the fingerprint to scan"}
        {phase === "scanning" && `Analyzing... ${progress}%`}
        {phase === "done" && "Scan complete!"}
      </p>
    </div>
  );
};

export default FingerprintScanner;
