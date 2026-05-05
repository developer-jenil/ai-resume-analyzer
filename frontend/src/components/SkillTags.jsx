function SkillTags({ title, skills, variant = "matched" }) {
  const colorClass =
    variant === "matched"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
      : "border-rose-400/30 bg-rose-400/10 text-rose-200";

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full border px-3 py-1 text-xs capitalize ${colorClass}`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-400">No data found for this section.</p>
        )}
      </div>
    </div>
  );
}

export default SkillTags;
