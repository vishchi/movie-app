import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { useNavigate } from 'react-router-dom';

const MovieDetailContainer = {
  padding: "2em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const BackButtonAndTitle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px"
};

const Logo = {
  width: "150px",
  height: "50px",
  marginRight: "10px",
};

const ActionButtons = {
  display: "flex",
  gap: "15px"
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addMovieToList, removeMovieFromList, myList } = useContext(MovieContext);
  const navigate = useNavigate();

  const fetchMovie = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie, id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleNavigate = () => {
    navigate('/my-list');
  }

  return (
    <div style={MovieDetailContainer}>
      <div style={BackButtonAndTitle}>
        <Link to="/"><img src="https://image.pngaaa.com/6/3832006-middle.png" alt="Logo" style={Logo} /></Link>
        <h1>Movie Details</h1>
      </div>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title} ({movie.Year})</h2>
      <h4>{`Actors: ${movie.Actors}`}</h4>
      <h4>{`Genre: ${movie.Genre}`}</h4>
      <h4>{`Type: ${movie.Type}`}</h4>
      <p>{movie.Plot}</p>
      <div style={ActionButtons}>
        <div>
          {!myList.find(m => m.imdbID === movie.imdbID) && <button onClick={() => addMovieToList(movie)}>Add to My List</button>}
          {myList.find(m => m.imdbID === movie.imdbID) && <button onClick={() => removeMovieFromList(movie.imdbID)}>Remove from My List</button>}
        </div>
        <button onClick={handleNavigate}>Go to My List</button>
      </div>
    </div>
  );
};

export default MovieDetail;