import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useParams } from "react-router";
import useApiStore from "./oth/store";
import Vote from "./oth/Vote";
import { duration } from "./api";
import MovieFullDetail from "./movie/MovieFullDetail";

function MovieDetails() {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();

 const movieDetail = useApiStore((state) => state.movieDetail);
 const setMovieDetail = useApiStore((state) => state.setMovieDetail);
 const isLoading = useApiStore((state) => state.isLoading);

 useEffect(() => {
  if (id) setMovieDetail(id, "movie");
 }, [id, setMovieDetail]);

 if (isLoading)
  return <div className="text-center text-2xl font-bold my-20">Loading...</div>;

 return (
  <>
   <Box>
    <Box
     sx={{
      py: { xs: 1, sm: 3 },
      px: { xs: 3, md: 6 },
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: movieDetail.backdrop_path
       ? `linear-gradient(rgba(26,0,0,0.7), rgba(26,0,0,0.7)), url(${imgUrl}${movieDetail.backdrop_path})`
       : "none",
     }}
    >
     {/* MAIN FLEX CONTAINER */}
     <Box
      sx={{
       display: "flex",
       flexDirection: { xs: "column", sm: "row" },
       gap: 4,
       alignItems: "flex-start",
      }}
     >
      {/* LEFT COLUMN (IMAGE + COMPANIES) */}
      <Box
       sx={{
        width: { xs: "100%", sm: 300 },
        flexShrink: 0,
        mx: { xs: "auto", sm: 0 },
       }}
      >
       {/* POSTER */}
       <Box
        component="img"
        src={`${imgUrl}${movieDetail.poster_path}`}
        alt={movieDetail.title}
        sx={{
         width: "100%",
         borderRadius: 2,
         mb: 2,
        }}
       />

       {/* PRODUCTION COMPANIES */}
       <Box
        sx={{
         background: "#2c2b2b79",
         p: 1,
         columnCount: { xs: 1, sm: 2, md: 3 }, // responsive columns
         columnGap: "12px",
         borderRadius: 1,
        }}
       >
        {movieDetail?.production_companies?.map((p) => (
         <Box
          key={p.id}
          sx={{
           background: "#b1b1b1",
           p: "6px",
           mb: "12px", // spacing between items
           boxShadow: "1px 1px 5px #1a191967",
           borderRadius: ".3rem",
           textAlign: "center",
           display: "inline-block", // 🔑 REQUIRED for column layout
           width: "100%",
           breakInside: "avoid", // 🔑 prevents splitting
          }}
         >
          {p.logo_path && (
           <Box
            component="img"
            src={`${imgUrl}${p.logo_path}`}
            sx={{ width: 80, mb: 0.5 }}
            alt={p.name}
           />
          )}

          <Typography
           sx={{
            fontSize: "0.8rem",
            textDecoration: "underline",
           }}
          >
           {p.name}
          </Typography>
         </Box>
        ))}
       </Box>
      </Box>

      {/* RIGHT COLUMN (CONTENT) */}
      <Box sx={{ color: "white", maxWidth: 800 }}>
       <Typography variant="h4" fontWeight="bold">
        {movieDetail.title} ({movieDetail.release_date?.split("-")[0]})
       </Typography>

       <Typography sx={{ opacity: 0.8, mb: 2 }}>
        ({movieDetail.original_title})
       </Typography>

       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        <span className="border border-white/40 px-2 py-0.5 rounded">
         {movieDetail.adult ? "Adult" : "U/A 16+"}
        </span>
        <span>• {movieDetail?.release_date}</span>
        <span>
         • {movieDetail.spoken_languages?.map((s) => s.name).join(", ")}
        </span>
        <span> • {movieDetail.genres?.map((g) => g.name).join(", ")}</span>
       </Box>

       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Vote
         vote={Math.floor(movieDetail.vote_average * 10)}
         w={`w-16`}
         h={`h-16`}
        />
        <Typography>
         User Score:
         <span className="text-neutral-300">{movieDetail.vote_count}</span>
         <br />
         <strong>Budget:</strong>{" "}
         {movieDetail.budget
          ? movieDetail.budget.toLocaleString()
          : "Not Provided"}
         <br />
         <strong>Total Revenue:</strong>{" "}
         {movieDetail.revenue ? movieDetail.revenue.toLocaleString() : "N/A"}
         <br />
         <span>
          <strong>Duration: </strong>{" "}
          <span>{duration(movieDetail.runtime)}</span>
         </span>
        </Typography>
       </Box>

       <Typography sx={{ mt: 4, fontWeight: 600 }}>
        {movieDetail.tagline || ""}
       </Typography>

       <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
        Overview
       </Typography>
       <Typography sx={{ mt: 1, opacity: 0.85 }}>
        {movieDetail.overview}
       </Typography>
       <Box>
        {movieDetail.belongs_to_collection && (
         <Box sx={{ background: "#2c2b2b79" }}>
          <Box
           sx={{ display: "flex", gap: 1, padding: ".4rem", height: "100px" }}
          >
           <Box
            component="img"
            sx={{ flexShrink: 0 }}
            src={`${imgUrl}${movieDetail.belongs_to_collection.backdrop_path}`}
           />
           <Box
            component="img"
            src={`${imgUrl}${movieDetail.belongs_to_collection.poster_path}`}
           />
          </Box>
          <Typography>{movieDetail.belongs_to_collection.name}</Typography>
         </Box>
        )}
       </Box>
      </Box>
     </Box>
    </Box>
   </Box>

   {/* full details */}

   <>
    <MovieFullDetail movie={movieDetail} />
   </>
  </>
 );
}

export default MovieDetails;
