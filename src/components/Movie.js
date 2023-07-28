import { css } from '@emotion/react';
import {Link} from "react-router-dom";

const MovieCard = css`
width: 100%;
margin: 1em;
padding: 1em;
border: 1px solid #ddd;
border-radius: 4px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
display: flex;
flex-direction: column;
align-items: center;
transition: all 0.3s ease-in-out;

@media (min-width: 768px) {
  width: calc(50% - 4em);
}

@media (min-width: 1024px) {
  width: calc(50% - 4em);
}

&:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}
`;

const MovieImage = css`
width: 100%;
height: auto;
`;

const MovieTitle = css`
margin: 1em 0;
font-size: 1.25em;
font-weight: bold;
text-align: center;
`;

const MovieDetails = css`
font-size: 1em;
text-align: center;
color: #333;
`;

const Movie = ({ movie, onRemove }) => (
    <div css={MovieCard} key={movie.imdbID}>
      <Link to={`/${movie.imdbID}`}>
        <img src={movie.Poster} alt={movie.Title} css={MovieImage}/>
        <div css={MovieTitle}>{movie.Title}</div>
        <div css={MovieDetails}>{movie.Type} · {movie.Year}</div>
      </Link>
      {onRemove && <button onClick={() => onRemove(movie.imdbID)}>Remove</button>}
    </div>
  );

export default Movie;