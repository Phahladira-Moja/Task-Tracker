import Feed from "./Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text orange_gradient text-center">My Task Tracker</h1>
      <p className="desc text-center">
        Task&Tasks is a task tracker application. It's main focus is to keep you
        organized and aware of anything that needs to get done.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
