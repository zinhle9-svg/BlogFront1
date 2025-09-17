import Home from "./pages/home";
import Nav from "./pages/nav";
import Create from "./pages/blog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPost from "./pages/post";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homePage" element={<Home />} />
          <Route path="/createBlog" element={<Create />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
