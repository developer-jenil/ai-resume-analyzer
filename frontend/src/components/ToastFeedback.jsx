import { motion } from "framer-motion";

function ToastFeedback({ type = "success", message }) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={
        isError
          ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
          : { opacity: 1, y: 0 }
      }
      className={`rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-rose-300/40 bg-rose-400/10 text-rose-100"
          : "border-emerald-300/40 bg-emerald-400/10 text-emerald-100"
      }`}
    >
      {message}
    </motion.div>
  );
}

export default ToastFeedback;
