import { Link } from "react-router-dom";
import "./css/movie.css"

const Movie = ({ movie, onRemove }) => (
  <div className="movieCardStyle" key={movie.imdbID}>
    <Link to={`/${movie.imdbID}`}>
      <img src={movie.Poster} alt={movie.Title} className="movieImageStyle"/>
      <div className="movieTitleStyle" style={{maxWidth: '300px'}}>{movie.Title}</div>
      <div className="movieDetailsStyle">{`Type: ${movie.Type}`}</div>
      <div className="movieDetailsStyle">{`Year: ${movie.Year}`}</div>
    </Link>
    {onRemove && <button onClick={() => onRemove(movie.imdbID)}>Remove</button>}
  </div>
);

export default Movie;