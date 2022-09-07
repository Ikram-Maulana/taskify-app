import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";

// Styles
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <DragDropContext onDragEnd={() => {}}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
    />
  </DragDropContext>
);
