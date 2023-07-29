import React, { useContext, useEffect, useState, useCallback } from "react";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import Movie from "./Movie";
import { Link } from "react-router-dom";

const movieListContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "1em"
};

const paginationContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1em",
  width: "300px",
  marginLeft: "auto",
  marginRight: "auto"
};

const paginationButtonStyle = {
  padding: "0.5em 1em",
  margin: "0 0.5em",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const MovieListHeader = {
  width: "100%",
  display: "flex",
  gap: "50px",
  justifyContent: "center"
}

const inputPageStyle = { 
  width: "50px", 
  textAlign: "center" 
}

const MovieList = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputPage, setInputPage] = useState(1);

  const fetchMovies = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "a77c8b5d",
          s: "marvel",
          page: page,
        },
      });
      setMovies(response.data.Search);
      setTotalPages(Math.ceil(response.data.totalResults / 10));
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [setMovies]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const page = parseInt(inputPage);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  const movieStyle = {
    flex: "0 0 calc(50% - 20px)",
    margin: "10px",
    width: "calc(50% - 20px)",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div style={movieListContainerStyle}>
        <div style={MovieListHeader}>
          <h1>Movies List</h1>
          <Link to="/my-list"><h2>Go to My List</h2></Link>
        </div>
        {Array.isArray(movies) ? (
          movies.map((movie, index) => (
            <Movie style={movieStyle} movie={movie} key={movie.imdbID} />
          ))
        ) : (
          <div>No movies added to the list yet</div>
        )}
      </div>
      <div style={paginationContainerStyle}>
        <button
          style={paginationButtonStyle}
          onClick={() => {handlePageChange(currentPage - 1); setInputPage(currentPage - 1)}}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handleInputChange}
            style={inputPageStyle}
          />
          <span>
            {` /${totalPages}`}
          </span>
          <button type="submit" style={paginationButtonStyle}>
            Go
          </button>
        </form>
        <button
          style={paginationButtonStyle}
          onClick={() => {handlePageChange(currentPage + 1); setInputPage(currentPage + 1)}}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MovieList;