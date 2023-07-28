import React, { useContext, useEffect, useState, useCallback } from "react";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import Movie from "./Movie";

const movieListContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "1em",
  backgroundColor: "#f5f5f5",
};

const paginationContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1em",
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

const MovieList = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("http://www.omdbapi.com/", {
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

  useEffect(() => {
    fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  const movieStyle = {
    flex: "0 0 calc(50% - 20px)",
    margin: "10px",
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={movieListContainerStyle}>
      <h1>Movies List</h1>
      {Array.isArray(movies) ? (
        movies.map((movie, index) => (
          <Movie style={movieStyle} movie={movie} key={movie.imdbID} />
        ))
      ) : (
        <div>No movies added to the list yet</div>
      )}
      <div style={paginationContainerStyle}>
        <button
          style={paginationButtonStyle}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          style={paginationButtonStyle}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;