import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from "react-router";
import axios from 'axios';



const EditMovie = props => {

    const {path, url}= useRouteMatch();
    const index = url.slice(-1);
    const movieData= props.movieList[index]; 
    const newMovieList = props.movieList
    const [movie, setMovie] = useState({
        id: movieData.id,
        title: movieData.title,
        director: movieData.director,
        metascore: movieData.metascore,
        stars: movieData.stars
    })

    const handleChange = event => {
        setMovie({ ...movie, [event.target.name]: event.target.value })
    };

    const handleChangeArray =  (event,index) => {

        movieData.stars.splice(index, 1, event.target.value)        
    };
    const match = useHistory()

    const submit = event =>{
        event.preventDefault();
        axios
      .put(`http://localhost:5000/api/movies/${movieData.id}`, movie)
      .then(res => {
        alert('Edit Succesful')
        newMovieList.splice(movie.id, 1, res.data)
        setMovie({...movie, stars: movieData.stars})
        props.setMovieList(newMovieList)
        match.push(`/movies/${movie.id}`)
        console.log("BOTTOM OF SUBMIT")
        
            
        })
      .catch(err => console.log(err.response));
  };
    
   



    //   async function asyncCall() {
    //     console.log('calling');
    //     const newMovies = await movieData  
    //     setMovie(newMovies)
    //     console.log(movieData, "async")
    //     // expected output: 'resolved'
    //   }

    
    //     useEffect(() => {
    //        asyncCall()
    //       },[])
    

    




    return (
    <form className="movie-card" onSubmit={submit}>
      <h2>
          <input type='text' name='title' placeholder={movie.title} onChange={handleChange} />
      </h2>
      <div className="movie-director">
        Director: <em><input type='text' name='director' placeholder={movie.director} onChange={handleChange}/></em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong><input type='text' name='metascore' placeholder={movie.metascore} onChange={handleChange}/></strong>
      </div>
      <h3>Actors</h3>

      {movie.stars.map((star, index) => (
        <div key={star} className="movie-star">
          <input type='text' name={`stars`} placeholder={star} onChange={(event) =>handleChangeArray(event, index)}/>
        </div>
      ))}
      <input type='submit' name='submit' />
    </form>
    )
}

export default EditMovie; 