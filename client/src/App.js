import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from './components/EditMovie.js';
import axios from 'axios';

const App = () => {
  const match = useHistory();
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [newMovie, setNewMovie] = useState({
    id: 0,
    title:'',
    director:'',
    metascore:'',
    stars:['','','']
  })
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        const newMovieList = movieList.filter(element => element.id != res.data);
        console.log(newMovieList, "NEW")
        console.log(movieList,"afterSPLICE")
        setMovieList(newMovieList)
        match.push('/')
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleChange = event => {
    setNewMovie({ ...newMovie,id:movieList.length, [event.target.name]: event.target.value })
    console.log(newMovie)
};

const handleChangeArray =  (event,index) => {

    newMovie.stars.splice(index, 1, event.target.value)
    console.log(newMovie)        
};

const submitNewMovie = event =>{
  event.preventDefault();
  axios
  .post("http://localhost:5000/api/movies", newMovie)
      .then(res => {
        setMovieList(res.data)
        alert('Successfully added movie')
      })
      .catch(err => console.log(err.response));
}
  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} deleteMovie={deleteMovie}/>
        <h5>Add a New Movie</h5>
        <form className='add-movie' onSubmit={submitNewMovie}>
          <label htmlFor='title'>
            Title:
          <input type='text' name='title' onChange={handleChange} />
          </label>
          <label htmlFor='director'>
            Director:
          <input type='text' name='director' onChange={handleChange} />
          </label>
          <label htmlFor='metascore'>
            Metascore:
          <input type='text' name='metascore'onChange={handleChange} />
          </label>
          <label htmlFor='stars' className='add-stars'>
            Stars:
          <input type='text' name='stars' onChange={event => handleChangeArray(event,0)} />
          <input type='text' name='stars' onChange={event => handleChangeArray(event,1)}/>
          <input type='text' name='stars' onChange={event => handleChangeArray(event,2)}/>
          </label>
          <input type='submit' name='submit' className="add-movie-submit" />
        </form>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
      </Route>

      <Route path="/update-movie/:id">
        <EditMovie movieList={movieList} movieList={movieList} setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
