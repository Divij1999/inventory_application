import "./stylesheets/app.css";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="body">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export { App };
