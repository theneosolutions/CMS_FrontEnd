import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ReactFlow from "../Pages/ReactFlow";

export default function PrivateRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/apitree" element={<ReactFlow />} />
      </Routes>
    </Router>
  );
}
