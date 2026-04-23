import { FaTrash, FaEdit, FaCheck, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  addSubtask,
  toggleSubtask,
  openInGoogleCalendar,
}) {
  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date();

  const totalSubs = (task.subtasks || []).length;
  const completedSubs = (task.subtasks || []).filter(
    (subtask) => subtask.completed
  ).length;

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-start ${
        isOverdue ? "bg-red-50 border border-red-300" : "bg-white"
      }`}
    >
      <div className="flex-1">
        <div
          onClick={() => onToggle(task.id)}
          className="flex items-start gap-3 cursor-pointer"
        >
          <div
            className={`w-5 h-5 mt-1 flex items-center justify-center border-2 rounded-full ${
              task.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-400"
            }`}
          >
            {task.completed && <FaCheck size={10} />}
          </div>

          <div>
            <p
              className={`${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </p>

            {totalSubs > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {completedSubs}/{totalSubs} subtasks completed
              </p>
            )}

            <div className="flex gap-2 mt-2 flex-wrap">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  priorityColors[task.priority || "medium"]
                }`}
              >
                {task.priority || "medium"}
              </span>

              {task.dueDate && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    isOverdue
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {isOverdue ? "Overdue" : `Due: ${task.dueDate}`}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 ml-8">
          {(task.subtasks || []).map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(task.id, subtask.id)}
              />
              <span
                className={
                  subtask.completed ? "line-through text-gray-400" : "text-gray-700"
                }
              >
                {subtask.text}
              </span>
            </div>
          ))}

          <input
            type="text"
            placeholder="Add subtask and press Enter..."
            className="border px-3 py-2 rounded text-sm w-full mt-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSubtask(task.id, e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 text-lg ml-4 items-start">
        <button
          onClick={() => openInGoogleCalendar(task)}
          className="text-green-500 hover:text-green-700 transition"
          title="Add to Calendar"
        >
          <FaCalendarAlt />
        </button>

        <button
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:text-blue-700 transition"
          title="Edit Task"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete Task"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  );
}