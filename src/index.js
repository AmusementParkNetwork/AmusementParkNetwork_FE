import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./SocketContext";

import App from "./App";
import ChatPage from "./page/ChatPage";
import AdminPage from "./page/AdminPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </SocketProvider>
  </BrowserRouter>
);
