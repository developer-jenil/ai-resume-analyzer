import { motion } from "framer-motion";

function SuggestionsPanel({ suggestions = [], weakAreas = [] }) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="mb-4 text-lg font-semibold">Smart Suggestions</h3>
      <div className="space-y-2">
        {suggestions.map((tip, index) => (
          <p key={`${tip}-${index}`} className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
            {tip}
          </p>
        ))}
      </div>
      {!!weakAreas.length && (
        <div className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/10 p-4">
          <h4 className="mb-2 text-sm font-semibold text-amber-200">Weak Areas</h4>
          <ul className="list-disc space-y-1 pl-5 text-sm text-amber-100">
            {weakAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default SuggestionsPanel;
