import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl"
    >
      <div className="section-padding flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-cyan-400 shadow-glow" />
          <h1 className="text-lg font-semibold tracking-wide">AI Resume Analyzer</h1>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          SaaS Portfolio Build
        </span>
      </div>
    </motion.header>
  );
}

export default Navbar;
