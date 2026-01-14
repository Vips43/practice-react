import { useEffect, useState } from "react";
import movieAPI from "./api";
import NavBar from "./oth/NavBar";

function TMDB() {
 const [movie, setMovie] = useState([]);
 const imgUrl = "https://image.tmdb.org/t/p/w500";

 useEffect(() => {
  document.title = "theMoviesDB";
 }, []);

 useEffect(() => {
  const getData = async () => {
   const data = await movieAPI();
   setMovie(data);
  };
  getData();
 }, []);

 return (
  <div className="w-full">
   <NavBar movie={movie} imgUrl={imgUrl} />
  </div>
 );
}

export default TMDB;
