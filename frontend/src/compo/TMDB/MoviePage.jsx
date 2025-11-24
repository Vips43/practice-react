import { useEffect, useState } from "react";
import movieAPI from "./api";

function MoviePage() {
 const [movie, setMovie] = useState(null);

 useEffect(() => {
  const getData = async () => {
   const data = await movieAPI();
   console.log(data);

   setMovie(data);
  };
  getData();
 }, []);
 //   movie.results.map(d=> console.log(d))

 return (
  <>
   <div className="w-full shadow-md p-5">
    <div className="space-y-5">
     <div>
      <h2 className="text-center">Page 1</h2>
     </div>
     <div className="grid grid-cols-2 gap-5">
      {movie?.results?.map((d) => (
       <div key={d.id} className="flex flex-col justify-between">
        {" "}
        <h2>{d.adult}</h2>
        <div>
         <div>
          <h2>
           Title <span>{d.title}</span>{" "}
          </h2>
          <p>{d.overview}</p>
          <img src="${d.poster_path}" alt={d.title} />
         </div>
         <h3>{d.release_date}</h3>
         <p className="flex justify-between"><span>Rating: {d.vote_average}</span><span>Vote-Count: {d.vote_count}</span></p>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </>
 );
}

export default MoviePage;
