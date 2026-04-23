export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  const overdue = tasks.filter(
    t =>
      t.dueDate &&
      !t.completed &&
      new Date(t.dueDate) < new Date()
  ).length;

  const stats = [
    { label: "Total", value: total, color: "bg-blue-500" },
    { label: "Active", value: active, color: "bg-yellow-500" },
    { label: "Completed", value: completed, color: "bg-green-500" },
    { label: "Overdue", value: overdue, color: "bg-red-500" },
  ];

  return (
   <div className="grid grid-cols-2 gap-3 mt-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow p-4 text-center"
        >
          <div className={`w-3 h-3 mx-auto mb-2 rounded-full ${stat.color}`} />
          <p className="text-sm text-gray-500">{stat.label}</p>
          <h2 className="text-xl font-bold text-gray-800">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}