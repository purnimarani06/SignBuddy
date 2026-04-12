import { useState, useCallback } from "react";
import { Activity } from "lucide-react";
import FingerprintScanner from "@/components/FingerprintScanner";
import ResultCard from "@/components/ResultCard";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getBPStatus = (sys: number) => {
  if (sys < 120) return { status: "Normal", color: "bg-primary/20 text-primary" };
  if (sys < 130) return { status: "Elevated", color: "bg-yellow-500/20 text-yellow-400" };
  if (sys < 140) return { status: "High - Stage 1", color: "bg-orange-500/20 text-orange-400" };
  return { status: "High - Stage 2", color: "bg-accent/20 text-accent" };
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const Index = () => {
  const [results, setResults] = useState<{
    systolic: number;
    diastolic: number;
    heartRate: number;
    bloodGroup: string;
  } | null>(null);

  const handleScanComplete = useCallback(() => {
    const systolic = randomInt(105, 155);
    const diastolic = randomInt(65, 95);
    setResults({
      systolic,
      diastolic,
      heartRate: randomInt(60, 100),
      bloodGroup: BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)],
    });
  }, []);

  const reset = () => setResults(null);

  const bpStatus = results ? getBPStatus(results.systolic) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      {/* Header */}
      <div className="flex items-center gap-2 mb-2 animate-fade-in-up">
        <Activity className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight">BioScan</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        Fingerprint Health Analyzer
      </p>

      {!results ? (
        <FingerprintScanner onComplete={handleScanComplete} />
      ) : (
        <>
          <ResultCard
            systolic={results.systolic}
            diastolic={results.diastolic}
            heartRate={results.heartRate}
            bloodGroup={results.bloodGroup}
            status={bpStatus!.status}
            statusColor={bpStatus!.color}
          />
          <button
            onClick={reset}
            className="mt-6 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors border border-border"
          >
            Scan Again
          </button>
        </>
      )}
    </div>
  );
};

export default Index;
