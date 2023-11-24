import TaskCard from "./TaskCard";

const TaskCardList = ({ data }: { data: any }) => {
  const isLoggedIn = true;

  return (
    <div className="tasks_layout">
      {!isLoggedIn ? (
        <p>Not logged In</p>
      ) : data.length === 0 ? (
        <div className="flex flex-row">
          <p className="desc text-center">No Tasks Available</p>
        </div>
      ) : (
        data.map((task: any) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskCardList;
