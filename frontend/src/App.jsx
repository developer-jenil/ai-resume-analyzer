import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AnalyzerPage from "./pages/AnalyzerPage";
import { pageContainer, staggerContainer } from "./animations/pageVariants";

function App() {
  return (
    <motion.div
      variants={pageContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="no-print">
        <Navbar />
      </div>
      <motion.main variants={staggerContainer} className="pb-14">
        <div className="no-print">
          <LandingPage />
        </div>
        <AnalyzerPage />
      </motion.main>
    </motion.div>
  );
}

export default App;
