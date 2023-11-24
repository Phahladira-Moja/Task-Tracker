import Home from "@/components/Home";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <Toaster />
      <main className="app">
        <Header />
        <Home />
      </main>
    </>
  );
};

export default Layout;
