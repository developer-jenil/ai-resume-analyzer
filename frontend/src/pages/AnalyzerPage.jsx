import { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import UploadCard from "../components/UploadCard";
import JobDescriptionInput from "../components/JobDescriptionInput";
import ScoreGauge from "../components/ScoreGauge";
import SkillTags from "../components/SkillTags";
import SuggestionsPanel from "../components/SuggestionsPanel";
import ResultsCharts from "../components/ResultsCharts";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ToastFeedback from "../components/ToastFeedback";
import HistoryPanel from "../components/HistoryPanel";
import { fadeUpItem } from "../animations/pageVariants";
import { uploadResume, analyzeResume } from "../services/api";

function AnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeId, setResumeId] = useState("");
  const [resumePreview, setResumePreview] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "success", message: "" });

  const reportRef = useRef(null);

  const handleDownloadPDF = () => {
    // Hide non-report elements before printing
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * { visibility: hidden; }
        #report-section, #report-section * { visibility: visible; }
        #report-section { position: absolute; left: 0; top: 0; width: 100%; }
        .no-print { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const canAnalyze = useMemo(
    () => Boolean(resumeId && jobDescription && jobDescription.trim().length > 20),
    [resumeId, jobDescription]
  );

  const handleFileSelected = async (file) => {
    setSelectedFile(file);
    setResult(null);
    setFeedback({ type: "success", message: "" });
    setUploadProgress(0);

    try {
      const uploadData = await uploadResume(file, setUploadProgress);
      setResumeId(uploadData.resumeId);
      setResumePreview(uploadData.preview);
      setFeedback({ type: "success", message: "Resume uploaded and parsed successfully." });
    } catch (error) {
      const message =
        error?.response?.data?.detail || "Failed to upload/parse resume. Try another PDF.";
      setFeedback({ type: "error", message });
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setFeedback({ type: "success", message: "" });

    try {
      const data = await analyzeResume({
        resumeId,
        jobDescription,
      });
      setResult(data);
      setFeedback({ type: "success", message: "Analysis completed successfully." });
    } catch (error) {
      const message = error?.response?.data?.detail || "Analysis failed. Please try again.";
      setFeedback({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analyzer" className="section-padding pb-10">
      <motion.div variants={fadeUpItem} className="mb-6 no-print">
        <ToastFeedback type={feedback.type} message={feedback.message} />
      </motion.div>

      <motion.div variants={fadeUpItem} className="grid gap-4 lg:grid-cols-2 no-print">
        <UploadCard
          fileName={selectedFile?.name}
          uploadProgress={uploadProgress}
          onFileSelected={handleFileSelected}
        />
        <JobDescriptionInput
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          selectedPreset={selectedPreset}
          setSelectedPreset={setSelectedPreset}
        />
      </motion.div>

      <motion.div variants={fadeUpItem} className="mt-4 no-print">
        <motion.button
          whileHover={{ scale: canAnalyze ? 1.02 : 1 }}
          whileTap={{ scale: canAnalyze ? 0.98 : 1 }}
          disabled={!canAnalyze || loading}
          onClick={handleAnalyze}
          className="rounded-xl bg-gradient-to-r from-brand-500 to-cyan-400 px-6 py-3 font-semibold text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Analyzing..." : "Analyze Resume Match"}
        </motion.button>
      </motion.div>

      {!!resumePreview && (
        <motion.div variants={fadeUpItem} className="glass-card mt-5 rounded-2xl p-5 no-print">
          <h3 className="mb-2 text-lg font-semibold">Parsed Resume Preview</h3>
          <p className="max-h-40 overflow-auto whitespace-pre-wrap text-sm text-slate-300">
            {resumePreview}
          </p>
        </motion.div>
      )}

      <div className="mt-8">
        {loading && <LoadingSkeleton />}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.12 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                className="no-print flex items-center gap-2 rounded-lg border border-brand-400/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300 transition-colors hover:bg-brand-500/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
              </motion.button>
            </div>
            
            <div id="report-section" ref={reportRef} className="space-y-4 rounded-xl print:bg-slate-950 print:text-white print:p-8">
              <div className="hidden print:block mb-8 text-center border-b border-white/20 pb-4">
                <h1 className="text-3xl font-bold text-brand-400">AI Resume Analysis Report</h1>
              </div>

              <motion.div variants={fadeUpItem} className="grid gap-4 lg:grid-cols-3 print:grid-cols-3 print:gap-4 print:page-break-inside-avoid">
                <ScoreGauge score={result.matchScore || 0} />
                <SkillTags title="Matching Skills" skills={result.matchedSkills || []} variant="matched" />
                <SkillTags title="Missing Skills" skills={result.missingSkills || []} variant="missing" />
              </motion.div>

              <motion.div variants={fadeUpItem} className="print:page-break-inside-avoid">
                <ResultsCharts
                  scoreBreakdown={result.scoreBreakdown}
                  matchedCount={result.matchedSkills?.length || 0}
                  missingCount={result.missingSkills?.length || 0}
                />
              </motion.div>

              <motion.div variants={fadeUpItem} className="grid gap-4 lg:grid-cols-2 print:grid-cols-2 print:gap-4 print:page-break-inside-avoid">
                <SkillTags title="Keyword Overlap" skills={result.keywordOverlap || []} variant="matched" />
                <SuggestionsPanel
                  suggestions={result.suggestions || []}
                  weakAreas={result.weakAreas || []}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="mt-12 no-print">
        <HistoryPanel />
      </div>
    </section>
  );
}

export default AnalyzerPage;
