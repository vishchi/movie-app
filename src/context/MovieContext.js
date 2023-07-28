import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  });

  const [movies, setMovies] = useState([]);

  const addMovieToList = (movie) => {
    setMyList(prevList => [...prevList, movie]);
  };

  const removeMovieFromList = (id) => {
    setMyList(prevList => prevList.filter(movie => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  return (
    <MovieContext.Provider value={{ myList, addMovieToList, removeMovieFromList, movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};
