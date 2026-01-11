import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Vote from "./oth/Vote";
import useApiStore from "./oth/store";
import { useParams } from "react-router";
import ShowExtraDetails from "./oth/show/ShowExtraDetails";

function TVShowDetails() {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();

 const movieDetail = useApiStore((state) => state.movieDetail);
 const setMovieDetail = useApiStore((state) => state.setMovieDetail);

 useEffect(() => {
  if (!id) return;
  useApiStore.getState().setMovieDetail(id, "tv");
 }, [id, setMovieDetail]);

 /* 🔑 PREVENT CRASH ON REFRESH */
 if (!movieDetail) {
  return (
   <Box sx={{ p: 4, textAlign: "center", color: "white" }}>
    Loading TV show details…
   </Box>
  );
 }

 return (
  <>
   <Box
    sx={{
     py: { xs: 1, sm: 3 },
     px: { xs: 2, md: 6 },
     backgroundSize: "cover",
     backgroundPosition: "center",
     backgroundImage: movieDetail?.backdrop_path
      ? `linear-gradient(rgba(26,0,0,0.7), rgba(26,0,0,0.7)), url(${imgUrl}${movieDetail?.backdrop_path})`
      : "none",
    }}
   >
    {/* MAIN LAYOUT */}
    <Box
     sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: 4,
      alignItems: "flex-start",
     }}
    >
     {/* LEFT COLUMN */}
     <Box
      sx={{
       width: { xs: "100%", sm: 300 },
       flexShrink: 0,
      }}
     >
      {/* POSTER */}
      <Box
       component="img"
       src={
        movieDetail.poster_path
         ? `${imgUrl}${movieDetail?.poster_path}`
         : "/no-poster.png"
       }
       alt={movieDetail.name}
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
        borderRadius: 1,

        /* 🔑 GRID ON MOBILE, COLUMNS ON DESKTOP */
        display: { xs: "block" },
        gridTemplateColumns: {  xs: "unset" },

        columnCount: { xs: 2, sm: 3, },
        columnGap: "10px",
       }}
      >
       {movieDetail?.production_companies?.map((p) => (
        <Box
         key={p.id}
         sx={{
          background: "#b1b1b1",
          p: 1,
          mb: 1,
          boxShadow: "1px 1px 5px #1a191967",
          borderRadius: ".3rem",
          textAlign: "center",

          width: "100%",
          display: "block",
          breakInside: "avoid",
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

     {/* RIGHT COLUMN */}
     <Box sx={{ color: "white", maxWidth: 800 }}>
      <Typography variant="h4" fontWeight="bold">
       {movieDetail.name} ({movieDetail?.first_air_date?.split("-")[0]})
      </Typography>

      <Typography sx={{ opacity: 0.8, mb: 2 }}>
       ({movieDetail.original_name})
      </Typography>

      <Box sx={{ mb: 3 }}>
       <span className="border border-white/40 px-2 py-0.5 rounded">
        {movieDetail.adult ? "Adult" : "U/A 16+"}
       </span>
       <span> • {movieDetail?.first_air_date}</span>
       <span>
        {" "}
        • {movieDetail.spoken_languages?.map((s) => s.name).join(", ")}
       </span>
       <span> • {movieDetail?.genres?.map((g) => g.name).join(", ")}</span>
       <span> • {movieDetail.type}</span>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
       <Vote
        vote={Math.floor(movieDetail?.vote_average * 10)}
        w="w-20"
        h="h-20"
       />
       <Typography>
        User Score:
        <span className="text-neutral-300"> {movieDetail.vote_count}</span>
        <br />
        <strong>In Production:</strong>{" "}
        {movieDetail.in_production ? "Yes" : "No"}
        <br />
        <strong>Total Episodes:</strong>{" "}
        {movieDetail.number_of_episodes ?? "N/A"}
        <br />
        <strong>Total Seasons:</strong> {movieDetail.number_of_seasons ?? "N/A"}
        <br />
        <strong>Last Air Date:</strong> {movieDetail.last_air_date}
       </Typography>
      </Box>

      {/* TAGLINE */}
      <Typography
       sx={{
        mt: 4,
        fontWeight: 600,
        fontStyle: "italic",
        opacity: 0.85,
       }}
      >
       {movieDetail.tagline}
      </Typography>

      {/* OVERVIEW */}
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
       Overview
      </Typography>
      <Typography sx={{ mt: 1, opacity: 0.85 }}>
       {movieDetail.overview}
      </Typography>

      {/* CREATED BY */}
      {movieDetail.created_by?.length > 0 && (
       <Box
        sx={{
         mt: 3,
         border: "1px solid #363636ab",
         borderRadius: 2,
         p: 1,
         background: "#2c2b2b65",
        }}
       >
        <Typography variant="caption" sx={{ opacity: 0.4 }}>
         Created By
        </Typography>

        <Box sx={{ mt: 1, display: "flex", gap: 2, flexWrap: "wrap" }}>
         {movieDetail?.created_by?.map((c) => (
          <Box key={c.id} sx={{ display: "flex", gap: 1.5 }}>
           {c.profile_path && (
            <Box
             component="img"
             src={`${imgUrl}${c.profile_path}`}
             sx={{ height: 48, borderRadius: 1 }}
            />
           )}
           <Box>
            <Typography sx={{ textDecoration: "underline" }}>
             {c.name}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>
             {c.original_name}
            </Typography>
           </Box>
          </Box>
         ))}
        </Box>
       </Box>
      )}
     </Box>
    </Box>
   </Box>

   {/* EXTRA DETAILS */}
   <ShowExtraDetails url={imgUrl} movieDetail={movieDetail} />
  </>
 );
}

export default TVShowDetails;
