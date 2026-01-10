import React from "react";
import useApiStore from "../oth/store";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import img from "/No-image.png";

function SearchPeople({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const isLoading = useApiStore((s) => s.isLoading);
 // const movie = useApiStore(s=> s.isLoading)
 if (isLoading) {
  return (
   <div className="mx-auto grid place-items-center text-2xl font-bold my-14">
    Loading...
   </div>
  );
 }
 return (
  <>
   <Box sx={{}} className="space-y-2">
  
     <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
      <span className="opacity-35">lll</span>
     </Typography>

    {movie?.map((f) => {
     const isCast = Array.isArray(f.roles);

     return (
      <Card
       key={f.id}
       sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        boxShadow: "none",
        height: "fit-content",
       }}
      >
       {/* IMAGE */}
       <CardMedia
        component="img"
        image={f.profile_path ? `${imgUrl}${f.profile_path}` : img}
        alt={f.name}
        sx={{
         width: 70,
         height: 70,
         minWidth: 64,
         objectFit: "cover",
         borderRadius: 2,
         flexShrink: 0,
        }}
       />
       {/* CONTENT */}
       <CardContent sx={{ pt: 1 }}>
        <Typography
         variant="body1"
         sx={{
          fontWeight: 600,
          lineHeight: 1.2,
          "&:hover": { textDecoration: "underline" },
         }}
        >
         {f.name}
        </Typography>
        <Typography
         variant="caption"
         sx={{
          lineHeight: 1.2,
          opacity:0.9,
          "&:hover": { textDecoration: "underline" },
         }}
        >
         <strong>{f.known_for_department}</strong> • {f.known_for?.map(f=> f.original_title).join(', ')}
        </Typography>

        {/* CAST */}
        {isCast && (
         <Typography
          variant="body2"
          sx={{
           fontSize: "0.8rem",
           color: "text.secondary",
           whiteSpace: "wrap",
          }}
         >
          {f.roles.map((r, i) => (
           <span key={i}>
            <strong>{r.character}</strong>{" "}
            <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
            {i < f.roles.length - 1 && ", "}
           </span>
          ))}
         </Typography>
        )}

        {/* CREW */}
        {!isCast && (
         <Typography
          variant="body2"
          sx={{ fontSize: "0.8rem", color: "text.secondary" }}
         >
          {f?.jobs?.map((r, i) => (
           <span key={i}>
            <strong>{r.job}</strong>{" "}
            <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
            {i < f.jobs.length - 1 && ", "}
           </span>
          ))}
         </Typography>
        )}
       </CardContent>
      </Card>
     );
    })}
   </Box>
  </>
 );
}

export default SearchPeople;
