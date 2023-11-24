import { useState, useEffect } from "react";
import TaskCardList from "./TaskCardList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  //   const [tasks, setTasks] = useState([]);

  const debounce = (func: unknown, delay: number) => {
    let timer: unknown;
    return function (...args: unknown[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = async (value: string) => {
    try {
      console.log(value);
      //   const response = await fetch("/api/prompt/search", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       searchText: value,
      //     }),
      //   });
      //   const data = await response.json();
      //   setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const delayedSearch = debounce(handleSearch, 1500);

  const handleSearchChange = (e) => {
    setSearchText(e.currentTarget.value);
    delayedSearch(e.currentTarget.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a task"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <TaskCardList
        data={
          [
            // { id: 1, title: "Task" },
            // { id: 2, title: "Task 2" },
          ]
        }
      />
    </section>
  );
};

export default Feed;
