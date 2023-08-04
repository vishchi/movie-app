import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Movie from "../components/Movie";
import { Link } from "react-router-dom";

const MyListContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "1em"
}

const movieStyle = {
  flex: "0 0 calc(50% - 20px)",
  margin: "10px",
  width: "calc(50% - 20px)",
};

const BackButtonAndTitle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
};

const Logo = {
  width: "150px",
  height: "50px",
  marginRight: "10px",
};

const MyList = () => {
  const { myList, removeMovieFromList } = useContext(MovieContext);

  return (
    <div style={MyListContainer}>
      <div style={BackButtonAndTitle}>
        <Link to="/"><img src="https://image.pngaaa.com/6/3832006-middle.png" alt="Logo" style={Logo} /></Link>
        <h1>My List</h1>
      </div>
      {myList.map((movie) => (
        <Movie
          style={movieStyle}
          movie={movie}
          key={movie.imdbID}
          onRemove={removeMovieFromList}
        />
      ))}
    </div>
  );
};

export default MyList;