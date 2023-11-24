import { useState, useEffect } from "react";
import TaskCardList from "./TaskCardList";
import { ITask } from "@/lib/Models";
import { useUserContext } from "../providers/AuthContext";

import axios from "axios";

const Feed = () => {
  const { token, loading, setIsAuthenticated } = useUserContext();
  // const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  // const debounce = (func: unknown, delay: number) => {
  //   let timer: unknown;
  //   return function (...args: unknown[]) {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func(...args), delay);
  //   };
  // };

  // const handleSearch = async (value: string) => {
  //   try {
  //     console.log(value);
  //     //   const response = await fetch("/api/prompt/search", {
  //     //     method: "POST",
  //     //     body: JSON.stringify({
  //     //       searchText: value,
  //     //     }),
  //     //   });
  //     //   const data = await response.json();
  //     //   setPosts(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const delayedSearch = debounce(handleSearch, 1500);

  // const handleSearchChange = (e) => {
  //   setSearchText(e.currentTarget.value);
  //   delayedSearch(e.currentTarget.value);
  // };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // setSearchText("");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "http://localhost:8000/api/v1/tasks",
          config
        );

        console.log(response);

        // setPosts(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="feed">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tasks"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}

      <TaskCardList tasks={tasks} />
    </section>
  );
};

export default Feed;
