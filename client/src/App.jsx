import { useState } from "react";
import "./stylesheets/app.css";
import { Sidebar } from "./components/Sidebar";
import { Parts } from "./components/Parts";

const App = () => {
  return (
    <div className="body">
      <Sidebar />
      <Parts />
    </div>
  );
};

export { App };
