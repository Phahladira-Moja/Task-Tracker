import { useUserContext } from "../providers/AuthContext";
import { ITask } from "@/lib/Models";
import TaskCard from "./TaskCard";

interface TaskCardListProps {
  tasks: ITask[];
}

const TaskCardList = ({ tasks }: TaskCardListProps) => {
  const { isAuthenticated } = useUserContext();

  return (
    <div className="tasks_layout">
      {!isAuthenticated ? (
        <div className="flex-center">
          <img
            className="object-contain h-[215px] xl:h-[400px]"
            src="./src/assets/login.svg"
            alt="logo"
          />
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex-center flex-col">
          <img
            className="object-contain h-[150px] xl:h-[400px]"
            src="./src/assets/empty.svg"
            alt="logo"
          />
          <p className="desc xl:text-4xl text-center">No Tasks Available</p>
        </div>
      ) : (
        tasks.map((task: ITask) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskCardList;
