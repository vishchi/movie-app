import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from './context/MovieContext';
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import MyList from "./components/MyList";

function App() {
  return (
    <MovieProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/my-list" element={<MyList />} />
            <Route path="/:id" element={<MovieDetail />} />
            <Route path="/" element={<MovieList />} />
          </Routes>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;