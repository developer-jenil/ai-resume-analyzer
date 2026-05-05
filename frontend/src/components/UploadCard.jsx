import { useRef } from "react";
import { motion } from "framer-motion";

function UploadCard({ fileName, uploadProgress, onFileSelected }) {
  const inputRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-card rounded-2xl p-5"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upload Resume</h3>
        <span className="text-xs text-slate-400">PDF only</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-xl border border-dashed border-brand-400/45 bg-brand-500/10 p-6 text-left transition-all hover:shadow-glow"
      >
        <p className="text-sm text-slate-200">
          Drag and drop your resume or click to choose file
        </p>
        <p className="mt-1 text-xs text-slate-400">{fileName || "No file selected"}</p>
      </motion.button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) onFileSelected(selected);
        }}
      />

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Upload Progress</span>
          <span>{uploadProgress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default UploadCard;
