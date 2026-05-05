import { motion } from "framer-motion";
import { fadeUpItem } from "../animations/pageVariants";

function LandingPage() {
  return (
    <section className="section-padding py-14 md:py-16">
      <motion.div variants={fadeUpItem} className="mx-auto max-w-4xl text-center">
        <p className="mb-4 inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1 text-xs text-brand-400">
          AI-Powered Resume Intelligence
        </p>
        <h2 className="bg-gradient-to-r from-white via-brand-400 to-cyan-300 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
          Optimize Resume-to-Role Match Like a Modern SaaS Product
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-300 md:text-base">
          Upload your resume, compare it with a target job description, and receive an
          intelligent fit score with skill-gap insights and tailored improvement actions.
        </p>
      </motion.div>
    </section>
  );
}

export default LandingPage;
