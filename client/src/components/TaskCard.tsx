import { ITask } from "@/lib/Models";
import ConfirmModal from "./modals/ConfirmModal";
import TaskModal from "./modals/TaskModal";

interface TaskCardProps {
  task: ITask;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="flex-between task_layout">
      <div className="flex flex-col w-2/3">
        <h3 className="font-satoshit font-semibold text-gray-900">
          {task.title}
        </h3>
        <p className="font-inter text-sm text-gray-500 truncate">
          {task.description}
        </p>
      </div>

      <div className="flex gap-2 mr-4">
        <TaskModal isCreating={false} {...task} />
        <ConfirmModal isLoggingOut={false} />
      </div>
    </div>
  );
};

export default TaskCard;
