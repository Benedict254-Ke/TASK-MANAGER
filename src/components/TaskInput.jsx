export default function TaskInput({
  input,
  setInput,
  onSubmit,
  isEditing,
  priority,
  setPriority,
  dueDate,
  setDueDate,
}) {
  return (
    <div className="max-w-md mx-auto mb-6 space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={onSubmit}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition shadow"
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      <div className="flex gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}