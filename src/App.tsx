import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlappyBird from "./games/FlappyBird/FlappyBird";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flappy-bird" element={<FlappyBird />} />
      </Routes>
    </Router>
  );
}

export default App;
