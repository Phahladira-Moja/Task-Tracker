import TaskCard from "./TaskCard";

const TaskCardList = ({ data }: { data: any }) => {
  const isLoggedIn = true;

  return (
    <div className="tasks_layout">
      {!isLoggedIn ? (
        <div className="flex-center">
          <img
            className="object-contain h-[215px] xl:h-[400px]"
            src="./src/assets/login.svg"
            alt="logo"
          />
        </div>
      ) : data.length === 0 ? (
        <div className="flex-center flex-col">
          <img
            className="object-contain h-[150px] xl:h-[400px]"
            src="./src/assets/empty.svg"
            alt="logo"
          />
          <p className="desc xl:text-2xl text-center">No Tasks Available</p>
        </div>
      ) : (
        data.map((task: any) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskCardList;
