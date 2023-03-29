import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { PartContainer } from "./components/PartContainer";
import { PartDetail } from "./components/PartDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PartContainer />,
      },
      {
        path: "/:id",
        element: <PartDetail />,
        loader: ({ params }) => {
          return params.id;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
