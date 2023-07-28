import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { css } from "@emotion/react";
import Movie from "./Movie";

const MyListContainer = css`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyList = () => {
  const { myList, removeMovieFromList } = useContext(MovieContext);

  return (
    <div css={MyListContainer}>
      <h1>My List</h1>
      {myList.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onRemove={removeMovieFromList} />
      ))}
    </div>
  );
};

export default MyList;
