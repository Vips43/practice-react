import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Vote from "./oth/Vote";
import useApiStore from "./oth/store";
import { useParams } from "react-router";
import ShowExtraDetails from "./oth/show/ShowExtraDetails";
import { fetchGlobal } from "./api";

function TVShowDetails() {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();
 const [content_rating, setContenet_Rating] = useState(null);

 const movieDetail = useApiStore((state) => state.tvDetail);
 const setMovieDetail = useApiStore((state) => state.setMovieDetail);
 const directorInfo = useApiStore((state) => state.directorInfo);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const signal = controller;

  setMovieDetail(id, "tv", { signal });

  const getData = async () => {
   let data = await fetchGlobal("tv", id, "content_ratings", { signal });
   data = data?.results?.find(
    (d) =>
     d.iso_3166_1 === "IN" ?? data.results.find((d) => d.iso_3166_1 === "US")
   );
   console.log("content rating ", data);

   setContenet_Rating(data);
  };
  getData();

  return () => {
   controller.abort();
  };
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
     py: { xs: 2, sm: 3 },
     px: { xs: 3, md: 6 },
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
       color: "white",
       width: { xs: "100%", sm: 350 },
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
       alt={movieDetail.name || "no image"}
       sx={{
        width: "100%",
        borderRadius: 2,
        mb: 2,
       }}
      />

      <Box
       sx={{
        display: { xs: "none", md: "flex" },
        flexWrap: "wrap",
        gap: 3,
        alignItems: "flex-start",
       }}
      >
       {/* DIRECTOR */}
       <Box sx={{ minWidth: 120 }}>
        <Typography
         sx={{
          fontWeight: 600,
          textDecoration: "underline",
          lineHeight: 1.2,
         }}
        >
         {directorInfo.name}
        </Typography>
        <Typography
         variant="caption"
         sx={{ opacity: 0.7, display: "block", mt: 0.3 }}
        >
         {directorInfo.jobs}
        </Typography>
       </Box>

       {/* TOP CREW */}
       {directorInfo?.topCrew?.map((t, i) => (
        <Box key={i} sx={{ minWidth: 120 }}>
         <Typography
          sx={{
           fontWeight: 600,
           textDecoration: "underline",
           lineHeight: 1.2,
          }}
         >
          {t.name}
         </Typography>
         <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.3 }}>
          {t.job}
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
        {content_rating?.rating}
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
