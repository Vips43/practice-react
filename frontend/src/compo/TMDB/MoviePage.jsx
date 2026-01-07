import { useEffect, useState } from "react";
import movieAPI from "./api";
import NavBar from "./oth/Navbar";

function MoviePage() {
 document.title = "theMoviesDB";
 const [movie, setMovie] = useState(
  JSON.parse(localStorage.getItem("movie")) || []
 );

 const imgUrl = `https://image.tmdb.org/t/p/w500`;
 useEffect(() => {
  const getData = async () => {
   const data = await movieAPI();
   console.log(data);

   localStorage.setItem("movie", JSON.stringify(data));
   setMovie(data);
  };
  getData();
 }, []);

 return (
  <>
  <div className="w-full">
   <NavBar movie={movie} imgUrl={imgUrl} />
  </div>
  </>
 );
}

export default MoviePage;
