import React from "react";
import Verification from "./components/Verification";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Verification />} />
        <Route path="/success" element={<h2>Verification Successful!</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
