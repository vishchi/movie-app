import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";
import { css } from '@emotion/react';
import Movie from "./Movie";

const MovieListContainer = css`
display: flex;
flex-direction: column;
align-items: center;
padding: 1em;
background-color: #f5f5f5;

@media (min-width: 768px) {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

@media (min-width: 1024px) {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
`;

const MovieList = () => {
  const { movies, setMovies } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);
  
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://www.omdbapi.com/",
        {
          params: {
            apikey: 'a77c8b5d',
            s: 'marvel'
          }
        }
      );
      setMovies(response.data.Search);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div css={MovieListContainer}>
      <h1>Movies List</h1>
      {Array.isArray(movies) ? movies.map(movie => <Movie movie={movie} />) : "No movies added to the list yet"}
    </div>
  );
};

export default MovieList;