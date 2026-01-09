import Box from "@mui/material/Box";
import useApiStore from "./oth/store";
import Vote from "./oth/Vote";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Card({ movie, children }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const navigate = useNavigate();

 if (!movie || movie.length === 0) return null;

 return (
  <Box
   sx={{
    border: "1px solid lightgrey",
    borderRadius: "10px",
    mt: 2,
   }}
  >
   {children}

   <Box
    sx={{
     display: "flex",
     overflowX: "auto",
     pt: 1,
    }}
    className="no-scrollbar"
   >
    {movie.map((d) => {
     // ✅ NORMALIZE MEDIA TYPE
     const type = d.media_type ?? (d.first_air_date ? "tv" : "movie");

     // ✅ NORMALIZE TITLE & DATE
     const title = type === "movie" ? d.title : d.name;
     const date = type === "movie" ? d.release_date : d.first_air_date;

     return (
      <Box
       key={d.id}
       sx={{
        flexShrink: 0,
        px: 1,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
         transform: "translate(1px, 1px)",
        },
       }}
       onClick={() => {
        const type = d.media_type ?? (d.first_air_date ? "tv" : "movie");
        navigate(`/tmdbapp/${type}/${d.id}`);
       }}
      >
       {/* IMAGE */}
       <Box sx={{ position: "relative" }}>
        <Box
         component="img"
         src={`${imgUrl}${d.poster_path}`}
         alt={title}
         sx={{
          height: 200,
          borderRadius: 1,
         }}
        />

        <Box sx={{ position: "absolute", bottom: -16, left: 8 }}>
         <Vote vote={Math.floor(d.vote_average * 10)} />
        </Box>
       </Box>

       {/* TEXT */}
       <Box sx={{ mt: 3, width: 130 }}>
        <Typography fontSize="0.9rem" fontWeight={600} noWrap>
         {title}
        </Typography>
        <Typography fontSize="0.75rem" color="text.secondary">
         {date}
        </Typography>
       </Box>
      </Box>
     );
    })}
   </Box>
  </Box>
 );
}

export default Card;
