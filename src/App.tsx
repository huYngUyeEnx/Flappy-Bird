import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlappyBird from "./games/FlappyBird/FlappyBird";
import BlockBlast from "./games/BlockBlast/BlockBlast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flappy-bird" element={<FlappyBird />} />
        <Route path="/block-blast" element={<BlockBlast />} />
      </Routes>
    </Router>
  );
}

export default App;
