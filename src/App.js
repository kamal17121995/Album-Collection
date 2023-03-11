import { Routes, Route } from "react-router-dom";
import Album from "./Albums";
import Home from "./Home";
import Navbar from "./Navbars";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/album"
          element={
            <Album />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
