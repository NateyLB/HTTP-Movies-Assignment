import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies, deleteMovie }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} deleteMovie={deleteMovie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
