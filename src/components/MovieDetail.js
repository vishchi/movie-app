import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { css } from "@emotion/react";

const MovieDetailContainer = css`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addMovieToList, removeMovieFromList, myList } = useContext(MovieContext);

  const fetchMovie = async () => {
    const response = await axios.get(
      "http://www.omdbapi.com/",
      {
        params: {
          apikey: 'a77c8b5d',
          i: id
        }
      }
    );
    setMovie(response.data);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div css={MovieDetailContainer}>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title} ({movie.Year})</h2>
      <p>{movie.Plot}</p>
      {!myList.find(m => m.imdbID === movie.imdbID) && <button onClick={() => addMovieToList(movie)}>Add to My List</button>}
      {myList.find(m => m.imdbID === movie.imdbID) && <button onClick={() => removeMovieFromList(movie.imdbID)}>Remove from My List</button>}
    </div>
  );
};

export default MovieDetail;