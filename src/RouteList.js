import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Boards from "./components/KanbanBoards/Boards";
import Board from "./components/KanbanBoard/Board";

const RouteList = () => {
  return (
    <Routes>
      <Route path="/boards" element={<Boards />} />
      <Route path="/boards/:id" element={<Board />} />
      <Route path="*" element={<Navigate to="/boards" replace />} />
    </Routes>
  );
};

export default RouteList;
