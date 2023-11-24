import Home from "@/components/Home";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <div className="main">
        <div className="gradient"></div>
      </div>

      <main className="app">
        <Header />
        <Home />
      </main>
    </>
  );
};

export default Layout;
