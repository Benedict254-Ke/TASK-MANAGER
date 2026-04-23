import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onDragEnd,
  addSubtask,
  toggleSubtask,
  openInGoogleCalendar,
}) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="max-w-md mx-auto space-y-3"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <AnimatePresence>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem
                        task={task}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        addSubtask={addSubtask}
                        toggleSubtask={toggleSubtask}
                        openInGoogleCalendar={openInGoogleCalendar}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}