import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Jigsaw from "./components/Jigsaw";
import Medium from "./components/Medium";
import Hard from "./components/Hard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jigsaw" element={<Jigsaw />} />
        <Route path="/medium" element={<Medium />} />
        <Route path="/hard" element={<Hard />} />

      </Routes>
    </Router>
  );
}

export default App;
