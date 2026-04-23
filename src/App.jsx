import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterTabs from "./components/FilterTabs";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();

      tasks.forEach((task) => {
        if (!task.dueDate || task.completed) return;

        const due = new Date(task.dueDate);
        const diff = due.getTime() - now.getTime();

        const oneDay = 24 * 60 * 60 * 1000;
        const notificationKey = `notified_${task.id}_${task.dueDate}`;

        if (
          diff > 0 &&
          diff <= oneDay &&
          Notification.permission === "granted" &&
          !sessionStorage.getItem(notificationKey)
        ) {
          new Notification("Task Reminder", {
            body: `"${task.text}" is due within 24 hours.`,
          });

          sessionStorage.setItem(notificationKey, "true");
        }
      });
    };

    checkDueTasks();
    const interval = setInterval(checkDueTasks, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (!input.trim()) return;

    if (editId) {
      setTasks(
        tasks.map((task) =>
          task.id === editId
            ? {
                ...task,
                text: input,
                priority,
                dueDate,
              }
            : task
        )
      );
      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: input,
        completed: false,
        priority,
        dueDate,
        subtasks: [],
      };

      setTasks([...tasks, newTask]);
    }

    setInput("");
    setPriority("medium");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));

    if (editId === id) {
      setEditId(null);
      setInput("");
      setPriority("medium");
      setDueDate("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (task) => {
    setInput(task.text);
    setEditId(task.id);
    setPriority(task.priority || "medium");
    setDueDate(task.dueDate || "");
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const addSubtask = (taskId, text) => {
    if (!text.trim()) return;

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            subtasks: [
              ...(task.subtasks || []),
              {
                id: Date.now(),
                text,
                completed: false,
              },
            ],
          };
        }
        return task;
      })
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = (task.subtasks || []).map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, completed: !subtask.completed }
              : subtask
          );

          const allCompleted =
            updatedSubtasks.length > 0 &&
            updatedSubtasks.every((subtask) => subtask.completed);

          return {
            ...task,
            subtasks: updatedSubtasks,
            completed: allCompleted,
          };
        }
        return task;
      })
    );
  };

  const openInGoogleCalendar = (task) => {
    if (!task.dueDate) {
      alert("This task has no due date.");
      return;
    }

    const startDate = new Date(task.dueDate);
    startDate.setHours(9, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      task.text
    )}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
      `Task reminder: ${task.text}`
    )}`;

    window.open(calendarUrl, "_blank");
  };

  const filteredTasks = [...tasks]
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = [...filteredTasks];
    const [movedTask] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedTask);

    const remainingTasks = tasks.filter(
      (task) => !filteredTasks.some((filtered) => filtered.id === task.id)
    );

    setTasks([...remainingTasks, ...reordered]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Task Manager
      </h1>

      <div className="max-w-md mx-auto mb-6">
        <button
          onClick={() => setShowDashboard(!showDashboard)}
          className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          {showDashboard ? "Hide Task Overview" : "Show Task Overview"}
        </button>

        {showDashboard && <Dashboard tasks={tasks} />}
      </div>

      <TaskInput
        input={input}
        setInput={setInput}
        onSubmit={addOrUpdateTask}
        isEditing={!!editId}
        priority={priority}
        setPriority={setPriority}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />

      <div className="max-w-md mx-auto mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <FilterTabs filter={filter} setFilter={setFilter} />

      <div className="max-w-md mx-auto flex justify-end mb-4">
        <button
          onClick={clearCompleted}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow"
        >
          Clear Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
        onDragEnd={onDragEnd}
        addSubtask={addSubtask}
        toggleSubtask={toggleSubtask}
        openInGoogleCalendar={openInGoogleCalendar}
      />
    </div>
  );
}
<p className="text-center text-gray-400 text-sm mt-10">
  Built by Lulu B 💻
</p>