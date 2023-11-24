import ConfirmModal from "./modals/ConfirmModal";
import TaskModal from "./modals/TaskModal";

const TaskCard = ({ task }: { task: any }) => {
  return (
    <div className="flex-between task_layout">
      <div className="flex flex-col">
        <h3 className="font-satoshit font-semibold text-gray-900">
          {task.title}
        </h3>
        <p className="font-inter text-sm text-gray-500">{task.title}</p>
      </div>

      <div className="flex gap-2 mr-4">
        <TaskModal isCreating={false} />
        <ConfirmModal isLoggingOut={false} />
      </div>
    </div>
  );
};

export default TaskCard;
