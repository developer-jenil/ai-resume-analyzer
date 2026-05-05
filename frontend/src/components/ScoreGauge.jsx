import { motion } from "framer-motion";
import useCountUp from "../hooks/useCountUp";

function ScoreGauge({ score }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const animatedScore = useCountUp(score, 900);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-4 text-lg font-semibold">Match Score</h3>
      <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
        <svg className="-rotate-90" width="176" height="176">
          <circle
            cx="88"
            cy="88"
            r={radius}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="13"
            fill="none"
          />
          <motion.circle
            cx="88"
            cy="88"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c8cff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <p className="text-4xl font-bold">{animatedScore}%</p>
          <p className="mt-1 text-xs text-slate-400">ATS Alignment</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreGauge;
