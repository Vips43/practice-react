import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useApiStore from "./oth/store";
import Vote from "./oth/Vote";
import { duration } from "./api"; // Removed fetchGlobal as it wasn't used
import MovieFullDetail from "./movie/MovieFullDetail";

function MovieDetails() {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();
 // const [content_rating, setContenet_Rating] = useState(null); // Unused

 const movieDetail = useApiStore((state) => state.movieDetail);
 const isLoading = useApiStore((state) => state.isLoading);
 const directorInfo = useApiStore((state) => state.directorInfo);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const { signal } = controller;

  useApiStore.getState().setMovieDetail(id, "movie", { signal });

  return () => controller.abort();
 }, [id]);

 if (!movieDetail || !movieDetail.id) {
  return "No results found";
 }

 if (isLoading)
  return <div className="text-center text-2xl font-bold my-20">Loading...</div>;

 return (
  <>
   <Box sx={{ color: "white", background:"grey" }}>
    {/* --- HERO SECTION (Image, Title, Meta) --- */}
    {/* Background image is only applied to this Box */}
    <Box
     sx={{
      py: { xs: 3, md: 6 },
      px: { xs: 2, md: 6 },
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundImage: movieDetail.backdrop_path
       ? `linear-gradient(to bottom, rgba(26,0,0,0.6), rgba(26,0,0,0.9)), url(${imgUrl}${movieDetail.backdrop_path})`
       : "linear-gradient(to bottom, #1a1a1a, #000)",
     }}
    >
     <Box
      sx={{
       display: "flex",
       flexDirection: "row", // Always row, even on mobile
       alignItems: { xs: "center", md: "flex-end" },
       gap: { xs: 2, md: 4 },
       maxWidth: "1200px",
       mx: "auto",
       p:2, m:2,
      }}
     >
      {/* POSTER IMAGE */}
      <Box
       component="img"
       src={`${imgUrl}${movieDetail.poster_path}`}
       alt={movieDetail.title}
       sx={{
        width: { xs: "100px", sm: "140px", md: "300px" }, // Small on mobile, large on desktop
        height: "auto",
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
        flexShrink: 0,
       }}
      />

      {/* TITLE & BASIC META (Right side of image) */}
      <Box>
       <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
         fontSize: { xs: "1.5rem", md: "2.5rem" },
         lineHeight: 1.1,
         mb: 1,
        }}
       >
        {movieDetail.title}{" "}
        <Typography
         component="span"
         sx={{
          opacity: 0.7,
          fontSize: { xs: "1rem", md: "1.5rem" },
          fontWeight: 400,
         }}
        >
         ({movieDetail.release_date?.split("-")[0]})
        </Typography>
       </Typography>

       <Typography
        sx={{
         opacity: 0.8,
         mb: { xs: 1, md: 2 },
         fontSize: { xs: "0.85rem", md: "1rem" },
         fontStyle: "italic",
        }}
       >
        {movieDetail.tagline}
       </Typography>

       {/* GENRES & META ROW */}
       <Box
        sx={{
         display: "flex",
         flexWrap: "wrap",
         alignItems: "center",
         gap: 1,
         fontSize: { xs: "0.75rem", md: "1rem" },
         opacity: 0.9,
        }}
       >
        <span className="border border-white/40 px-1.5 py-0.5 rounded text-xs md:text-sm">
         {movieDetail.adult ? "Adult" : "U/A 16+"}
        </span>
        <span>•</span>
        <span>{movieDetail?.release_date}</span>
        <span>•</span>
        <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
         {/* Hide spoken languages on very small screens to save space if needed */}
         {movieDetail?.spoken_languages?.map((s) => s.name).join(", ")}
         <span> • </span>
        </Box>

        <span>{movieDetail?.genres?.map((g) => g.name).join(", ")}</span>
        <span>•</span>
        <span>{duration(movieDetail.runtime)}</span>
       </Box>

       {/* VOTE CIRCLE (Mobile: Shown here / Desktop: Can be here too) */}
       <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Vote
         vote={Math.floor(movieDetail.vote_average * 10)}
         w={`w-12 md:w-14`}
         h={`h-12 md:h-14`}
         textSize="text-sm md:text-base"
        />
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
         User
         <br />
         Score
        </Typography>
       </Box>
      </Box>
     </Box>
    </Box>

    {/* --- BODY SECTION (Overview, Director, Details) --- */}
    {/* This is outside the BG image box */}
    <Box
     sx={{
      maxWidth: "1200px",
      mx: "auto",
      px: { xs: 3, md: 6 },
      py: 4,
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 6,
     }}
    >
     {/* LEFT/MAIN CONTENT: OVERVIEW */}
     <Box sx={{ flex: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
       Overview
      </Typography>
      <Typography
       sx={{
        opacity: 0.85,
        lineHeight: 1.6,
        fontSize: { xs: "0.95rem", md: "1.1rem" },
        mb: 4,
       }}
      >
       {movieDetail.overview}
      </Typography>

      {/* DIRECTOR & CREW GRID */}
      <Box
       sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
        gap: 3,
       }}
      >
       <Box>
        <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
         {directorInfo.name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
         {directorInfo.jobs}
        </Typography>
       </Box>

       {directorInfo?.topCrew?.map((t, i) => (
        <Box key={i}>
         <Typography fontWeight="bold" sx={{ textDecoration: "underline" }}>
          {t.name}
         </Typography>
         <Typography variant="caption" sx={{ opacity: 0.7 }}>
          {t.job}
         </Typography>
        </Box>
       ))}
      </Box>
     </Box>

     {/* RIGHT SIDEBAR: STATS & COLLECTION */}
     <Box
      sx={{
       flex: 1,
       display: "flex",
       flexDirection: "column",
       gap: 3,
       minWidth: { md: "250px" },
      }}
     >
      <Box>
       <Typography variant="subtitle1" fontWeight="bold">
        Status
       </Typography>
       <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {movieDetail.status}
       </Typography>
      </Box>

      <Box>
       <Typography variant="subtitle1" fontWeight="bold">
        Original Title
       </Typography>
       <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {movieDetail.original_title}
       </Typography>
      </Box>

      <Box>
       <Typography variant="subtitle1" fontWeight="bold">
        Budget
       </Typography>
       <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {movieDetail.budget
         ? "$" + movieDetail.budget.toLocaleString()
         : "Not Provided"}
       </Typography>
      </Box>

      <Box>
       <Typography variant="subtitle1" fontWeight="bold">
        Revenue
       </Typography>
       <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {movieDetail.revenue
         ? "$" + movieDetail.revenue.toLocaleString()
         : "N/A"}
       </Typography>
      </Box>

      {movieDetail.belongs_to_collection && (
       <Box
        sx={{
         mt: 2,
         borderRadius: 2,
         overflow: "hidden",
         border: "1px solid rgba(255,255,255,0.1)",
         background: "rgba(255,255,255,0.05)",
        }}
       >
        <Box
         sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1,
         }}
        >
         <Box
          component="img"
          src={`${imgUrl}${movieDetail.belongs_to_collection.poster_path}`}
          sx={{ width: 50, borderRadius: 1 }}
         />
         <Typography variant="body2" fontWeight="bold">
          Part of the <br />
          {movieDetail.belongs_to_collection.name}
         </Typography>
        </Box>
       </Box>
      )}
     </Box>
    </Box>
   </Box>
   {/* FULL DETAILS COMPONENT */}
   <MovieFullDetail movie={movieDetail} />
  </>
 );
}

export default MovieDetails;
