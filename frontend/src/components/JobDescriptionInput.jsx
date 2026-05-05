import { motion } from "framer-motion";

const PRESET_JOBS = {
  "Frontend Developer":
    "Looking for a Frontend Developer skilled in React, JavaScript, TypeScript, Tailwind CSS, REST APIs, Git, and performance optimization.",
  "Backend Engineer":
    "Seeking a Backend Engineer with Python, FastAPI, SQL, Docker, AWS, CI/CD, and scalable API design experience.",
  "Data Scientist":
    "Hiring Data Scientist with Python, NLP, scikit-learn, pandas, machine learning model deployment, and analytics communication skills.",
};

function JobDescriptionInput({ jobDescription, setJobDescription, selectedPreset, setSelectedPreset }) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Job Description</h3>
        <select
          value={selectedPreset}
          onChange={(e) => {
            const role = e.target.value;
            setSelectedPreset(role);
            if (role) setJobDescription(PRESET_JOBS[role]);
          }}
          className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-1 text-xs outline-none transition focus:border-brand-400"
        >
          <option value="">Use preset role (optional)</option>
          {Object.keys(PRESET_JOBS).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={10}
        className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm outline-none transition focus:border-brand-400 focus:shadow-glow"
        placeholder="Paste the job description here..."
      />
    </motion.div>
  );
}

export default JobDescriptionInput;
