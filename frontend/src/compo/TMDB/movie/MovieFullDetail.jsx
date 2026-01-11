import { Box, Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../api.js";
import Cast from "../oth/show/Cast.jsx";
import OthInfo from "./OthInfo.jsx";
import Keywords from "../oth/show/Keywords.jsx";
import Reviews from "../oth/show/Reviews.jsx";
import FullCasts from "../oth/show/FullCasts.jsx";

function MovieFullDetail({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();
 let type = "movie";
 const [cast, setCast] = useState([]);

 useEffect(() => {
  if (!id) return;
  const getData = async () => {
   const data = await fetchCast(id);
   setCast(data);
  };
  getData();
 }, [id]);

 if (!cast) return;

 return (
  <>
   <Box
    sx={{
     display: "grid",
     p: 1,
     gap: 1,
     gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    }}
   >
    <>
     <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
       Series Cast
      </Typography>

      <Cast cast={cast} url={imgUrl} />
      <Button
       component={Link}
       to={`/tmdbapp/${type}/${id}/cast`}
       variant="text"
       disableRipple
       sx={{
        textTransform: "none",
        width: "fit-content",
        color: "text.primary",
        transition: "all .3s ease-in-out",
        fontWeight: "600",
        fontSize: "1rem",

        "&:hover": {
         backgroundColor: "transparent",
         textDecoration: "underline",
         opacity: 0.7,
        },

        "&:active": {
         backgroundColor: "transparent",
        },
       }}
      >
       Full Cast&Crew →
      </Button>
     </Box>
     <FullCasts type={type}/>
    </>
    <>
     <OthInfo movie={movie} />
     <Keywords type={type} />
     <Reviews type={type} />
    </>
   </Box>
  </>
 );
}

export default MovieFullDetail;
