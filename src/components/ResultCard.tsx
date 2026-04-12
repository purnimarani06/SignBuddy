import { Heart, Droplets } from "lucide-react";

interface ResultCardProps {
  systolic: number;
  diastolic: number;
  heartRate: number;
  bloodGroup: string;
  status: string;
  statusColor: string;
}

const ResultCard = ({ systolic, diastolic, heartRate, bloodGroup, status, statusColor }: ResultCardProps) => {
  return (
    <div className="w-full max-w-sm space-y-4 animate-fade-in-up">
      {/* BP Card */}
      <div className="rounded-2xl p-5 border border-border" style={{ background: "var(--gradient-card)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-accent animate-heartbeat" />
          <h3 className="text-foreground font-heading font-semibold text-sm tracking-wide uppercase">Blood Pressure</h3>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-heading font-bold text-foreground">{systolic}</span>
          <span className="text-2xl text-muted-foreground font-heading">/</span>
          <span className="text-3xl font-heading font-bold text-foreground">{diastolic}</span>
          <span className="text-sm text-muted-foreground ml-2">mmHg</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
            {status}
          </span>
          <span className="text-muted-foreground text-sm">
            HR: <span className="text-foreground font-semibold">{heartRate}</span> bpm
          </span>
        </div>
      </div>

      {/* Blood Group Card */}
      <div className="rounded-2xl p-5 border border-border" style={{ background: "var(--gradient-card)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Droplets className="w-5 h-5 text-accent" />
          <h3 className="text-foreground font-heading font-semibold text-sm tracking-wide uppercase">Blood Group</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-5xl font-heading font-bold text-primary">{bloodGroup}</span>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>Detected via</p>
            <p>biometric analysis</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-muted-foreground/60 px-4 leading-relaxed">
        ⚠️ For entertainment only. Not a medical device. Consult a healthcare professional for accurate readings.
      </p>
    </div>
  );
};

export default ResultCard;
