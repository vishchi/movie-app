import { Link } from "react-router-dom";

const movieCardStyle = {
  width: "100%",
  padding: "1em",
  border: "1px solid #ddd",
  borderRadius: "4px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "all 0.3s ease-in-out",
  margin: "0 0 10px 10px",
};

const movieImageStyle = {
  maxWidth: "500px",
  maxHeight: "500px",
  textAlign: "center"
};

const movieTitleStyle = {
  margin: "1em 0",
  fontSize: "1.25em",
  fontWeight: "bold",
  textAlign: "center",
};

const movieDetailsStyle = {
  fontSize: "1em",
  textAlign: "center",
  color: "#333",
};

const Movie = ({ movie, onRemove }) => (
  <div style={movieCardStyle} key={movie.imdbID}>
    <Link to={`/${movie.imdbID}`}>
      <img src={movie.Poster} alt={movie.Title} style={movieImageStyle} />
      <div style={movieTitleStyle}>{movie.Title}</div>
      <div style={movieDetailsStyle}>{`Type: ${movie.Type}`}</div>
      <div>{`Year: ${movie.Year}`}</div>
    </Link>
    {onRemove && <button onClick={() => onRemove(movie.imdbID)}>Remove</button>}
  </div>
);

export default Movie;