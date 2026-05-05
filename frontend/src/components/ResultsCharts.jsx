import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function ResultsCharts({ scoreBreakdown, matchedCount, missingCount }) {
  const breakdownData = [
    { name: "Semantic", value: scoreBreakdown?.semanticSimilarity || 0 },
    { name: "Skills", value: scoreBreakdown?.skillsAlignment || 0 },
    { name: "Keywords", value: scoreBreakdown?.keywordCoverage || 0 },
  ];

  const skillData = [
    { name: "Matched", value: matchedCount },
    { name: "Missing", value: missingCount },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-card h-[300px] rounded-2xl p-4">
        <h3 className="mb-3 text-lg font-semibold">Score Breakdown</h3>
        <ResponsiveContainer width="100%" height="88%">
          <BarChart data={breakdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <Bar dataKey="value" fill="#7c8cff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card h-[300px] rounded-2xl p-4">
        <h3 className="mb-3 text-lg font-semibold">Skill Match Comparison</h3>
        <ResponsiveContainer width="100%" height="88%">
          <PieChart>
            <Pie data={skillData} dataKey="value" nameKey="name" outerRadius={95} innerRadius={52} label>
              <Cell fill="#10b981" />
              <Cell fill="#f43f5e" />
            </Pie>
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResultsCharts;
