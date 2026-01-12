import { Box, Typography } from "@mui/material";
import React from "react";

function Companies({ movie }) {
    const imgUrl = "https://image.tmdb.org/t/p/w500";
 return (
  <>
   <Box
    sx={{
     p: 1,
     columnCount: { xs: 2, sm: 2, md: 3 }, // responsive columns
     columnGap: "12px",
     borderRadius: 1,
    }}
   >
    {movie?.production_companies?.map((p) => (
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
        sx={{ width: 80, mb: 0.5, mx: "auto" }}
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
  </>
 );
}

export default Companies;
