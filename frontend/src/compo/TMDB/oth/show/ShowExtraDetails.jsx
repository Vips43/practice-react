import { useEffect } from "react";
import Cast from "./Cast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useApiStore from "../store";
import { Link, useParams } from "react-router";
import CurrSeason from "./CurrSeason";
import Keywords from "./Keywords";
import Videos from "./Videos";
import Reviews from "./Reviews";
import Button from "@mui/material/Button";

function ShowExtraDetails({ url }) {
 const { id } = useParams();
 const setCasts = useApiStore((state) => state.setCasts);
 const casts = useApiStore((state) => state.casts);
  const type= 'tv';

 useEffect(() => {
  if (id) setCasts(id, type);
 }, [id, setCasts]);
 if (!casts) return null;

 return (
  <>
   <Box
    sx={{
     mx: 2,
    }}
   >
    {/* SERIES CAST */}
    <Box sx={{ flex: 1, minWidth: 0 }}>
     <Typography variant="h5" fontWeight={600} mb={1}>
      Series Cast
     </Typography>

     <Cast cast={casts} url={url} layout="row" />
     <Button
     component={Link}
     to={`/tmdbapp/${type}/${id}/cast`}
      variant="text"
      disableRipple
      sx={{
       textTransform: "none",
       width: "fit-content",
       color: "text.primary",
       transition:"all .3s ease-in-out",
       fontWeight:"600",
       fontSize:"1rem",

       "&:hover": {
        backgroundColor: "transparent",
        textDecoration:"underline",
        opacity:0.7,
       },

       "&:active": {
        backgroundColor: "transparent",
       },
      }}
     >
      Full Cast&Crew →
     </Button>
    </Box>
   </Box>
   <Box
    sx={{
     display: "grid",
     gap: 2,
     m: 2,
     alignItems: "start",
     gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr",
     },
    }}
   >
    <CurrSeason />
    <Keywords url={url} type={"tv"} />
   </Box>
   <Box
    sx={{
     display: "grid",
     gap: 0.1,
     m: 2,
     alignItems: "start",
     gridTemplateColumns: {
      xs: "1fr",
      md: "1.3fr 0.7fr",
     },
    }}
   >
    <Reviews />
    <Videos />
   </Box>
  </>
 );
}

export default ShowExtraDetails;
