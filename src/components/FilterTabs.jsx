export default function FilterTabs({ filter, setFilter }) {
  const tabs = ["all", "active", "completed"];

  return (
    <div className="flex justify-center gap-3 mb-6">
      {tabs.map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-lg ${
            filter === type
              ? "bg-black text-white"
              : "bg-white text-black border"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}