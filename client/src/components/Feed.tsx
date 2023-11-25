import { useState, useEffect, ChangeEvent } from "react";
import TaskCardList from "./TaskCardList";
import { ITask } from "@/lib/Models";
import { useUserContext } from "../providers/AuthContext";

const Feed = () => {
  const { token, loading, setIsAuthenticated } = useUserContext();
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // setSearchText("");
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token ? token : "No Token"}`,
          },
        };

        const response = await fetch(
          "http://localhost:8000/api/v1/tasks",
          config
        );
        const data = await response.json();

        setIsAuthenticated(true);

        if (data.code === 401) {
          setIsAuthenticated(false);
        } else {
          setTasks(data.body);
        }
      } catch (error: unknown) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase()) ||
          task.description.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tasks"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>

      <TaskCardList tasks={searchText === "" ? tasks : filteredTasks} />
    </section>
  );
};

export default Feed;
