import Vote from "./oth/Vote";

function Card({ movie, imgUrl }) {
 return (
  <>
   {movie?.results?.map((d) => (
    <div key={d.id} className="shrink-0 flex flex-col gap-8 w-fit py-1 px-2 h-fit hover:-translate-y-0.5 hover:translate-x-0.5 transition-all cursor-pointer">
     <div className="relative h-50">
      <img
       src={`${imgUrl}${d.poster_path}`}
       alt={d.title}
       className="h-50 rounded-md"
      />
     <Vote vote={Math.floor(d.vote_average * 10)} />
     </div>
     <div className="self-start w-32 text-sm">
      <h2>
       <strong>{d.title}</strong>
      </h2>
      <h3>{d.release_date}</h3>
     </div>
    </div>
   ))}
  </>
 );
}

export default Card;
