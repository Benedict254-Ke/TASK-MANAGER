export default function SummaryPanel({ tasks }) {
  const accomplishedTasks = tasks.filter((task) => {
    const subtasks = task.subtasks || [];
    return task.completed || (subtasks.length > 0 && subtasks.every((sub) => sub.completed));
  });

  const partiallyCompletedTasks = tasks.filter((task) => {
    const subtasks = task.subtasks || [];
    const completedSubs = subtasks.filter((sub) => sub.completed).length;

    return (
      !task.completed &&
      subtasks.length > 0 &&
      completedSubs > 0 &&
      completedSubs < subtasks.length
    );
  });

  return (
    <div className="max-w-md mx-auto mt-4 bg-white rounded-xl shadow p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-green-600 mb-2">
          Accomplished Tasks
        </h2>

        {accomplishedTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No accomplished tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {accomplishedTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-3">
                <p className="font-medium text-gray-800">{task.text}</p>
                {(task.subtasks || []).length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {(task.subtasks || []).filter((sub) => sub.completed).length}/
                    {(task.subtasks || []).length} subtasks completed
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold text-yellow-600 mb-2">
          Partially Completed Tasks
        </h2>

        {partiallyCompletedTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No partially completed tasks yet.</p>
        ) : (
          <div className="space-y-3">
            {partiallyCompletedTasks.map((task) => {
              const totalSubs = (task.subtasks || []).length;
              const completedSubs = (task.subtasks || []).filter(
                (sub) => sub.completed
              ).length;

              return (
                <div key={task.id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800">{task.text}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {completedSubs}/{totalSubs} subtasks completed
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}