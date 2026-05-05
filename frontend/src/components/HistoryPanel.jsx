import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUpItem } from "../animations/pageVariants";
import { getResults } from "../services/api";

function HistoryPanel() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getResults();
        setHistory(data.results || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  if (loading) return null;
  if (history.length === 0) return null;

  return (
    <motion.div variants={fadeUpItem} className="glass-card rounded-2xl p-6">
      <h3 className="mb-4 text-xl font-bold">Recent Analysis History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-white/5 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Match Score</th>
              <th className="px-4 py-3">Matched Skills</th>
              <th className="px-4 py-3">Missing Skills</th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((item, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.timestamp ? new Date(item.timestamp).toLocaleString() : "N/A"}
                </td>
                <td className="px-4 py-3 font-semibold text-brand-300">
                  {item.matchScore}%
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.matchedSkills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs text-emerald-400">
                        {skill}
                      </span>
                    ))}
                    {item.matchedSkills.length > 3 && (
                      <span className="text-xs text-slate-500">+{item.matchedSkills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.missingSkills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="rounded bg-rose-500/10 px-1.5 py-0.5 text-xs text-rose-400">
                        {skill}
                      </span>
                    ))}
                    {item.missingSkills.length > 3 && (
                      <span className="text-xs text-slate-500">+{item.missingSkills.length - 3}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default HistoryPanel;
