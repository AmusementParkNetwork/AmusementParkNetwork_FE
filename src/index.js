import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ChatPage from "./ChatPage";
import Admin from "./page/admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
);
