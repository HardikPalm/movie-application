import "./App.css";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./movies";
import NewMovie from "./new-movie";
import EditMovie from "./edit-movies";
import EmptyPage from "./empty";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Use element prop and pass the component as JSX */}
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/new-movie" element={<NewMovie />} />
          <Route path="/edit-movies/:id/:title" element={<EditMovie />} />
          <Route path="/empty" element={<EmptyPage />} />
        </Routes>
      </Router>
      {/* <div>
        <img
          src="images/bottom-img.png"
          alt="Bottom Image"
          className="footer-image"
        />
      </div> */}
    </div>
  );
}

export default App;
