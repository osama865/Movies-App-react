import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [update, setUpdate] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((res) => {
      console.log(res.data);
      setMoviesList(res.data);
    });
  }, []);

  const handleSubmit = () => {
    axios.post("http://localhost:3001/api", {
      movieName: movieName,
      review: review,
    });
    setMoviesList([
      ...moviesList,
      { movie_name: movieName, movie_review: review },
    ]);
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/api/delete' ,{data : {id : id}}).then((res)=>{
      console.log(res);
    })

    const newList = moviesList.filter((item) => item.id !== id);
 
    setMoviesList(newList);
  }

  const handleUpdate = (id) => {
    axios.put('http://localhost:3001/api/update',{id : id , update : update}).then((res)=>{
      console.log(res);
    })
  }


  return (
    <div className="App">
      <h1>Movies App</h1>
      <div className="form">
        <label>Movie Name : </label>
        <input
          type="text"
          name="movie-name"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Movie Name : </label>
        <input
          type="text"
          name="movie-review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>

        {moviesList.map((val) => (
          <div className='card'>
            <h2 key={val.id}>movie name : {val.movie_name}</h2>
            <p> movie review : {val.movie_review}</p>
            <button className='delete' onClick={()=>{
              handleDelete(val.id)
            }} >Delete</button>
            <input
          type="text"
          name="update"
          onChange={(e) => {
            setUpdate(e.target.value);
          }}
        />
            <button className='update' onClick={()=>{
              handleUpdate(val.id , update)
            }} >Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
