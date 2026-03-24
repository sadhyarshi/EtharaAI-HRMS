function StatCard({ label, value }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

export default function DashboardStats({ summary, totalEmployees }) {
  const absentToday = (summary.total_employees ?? totalEmployees) - (summary.present_today ?? 0);

  return (
    <section className="stat-grid">
      <StatCard label="Employees" value={totalEmployees} />
      <StatCard label="Present Today" value={summary.present_today ?? 0} />
      <StatCard label="Absent Today" value={summary.absent_today ?? absentToday} />
      <StatCard label="Absent Entries" value={absentToday} />
    </section>
  );
}