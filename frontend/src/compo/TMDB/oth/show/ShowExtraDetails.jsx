import React, { useEffect } from "react";
import Cast from "./Cast";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useApiStore from "../store";
import { useParams } from "react-router";
import CurrSeason from "./CurrSeason";
import Keywords from "./Keywords";
import Videos from "./Videos";
import Reviews from "./Reviews";

function ShowExtraDetails({ url }) {
 const { id } = useParams();
 const setCasts = useApiStore((state) => state.setCasts);
 const casts = useApiStore((state) => state.casts);

 useEffect(() => {
  if (id) setCasts(id);
 }, [id, setCasts]);

 if (!casts) return null;

 return (
  <>
   <Box
    sx={{
     m: { xs: 2, md: 3 },
     display: "flex",
     flexDirection: { xs: "column", md: "row" },
     gap: { xs: 1, md: 2 },
    }}
   >
    {/* SERIES CAST */}
    <Box sx={{ flex: 1, minWidth: 0 }}>
     <Typography variant="h5" fontWeight={600} mb={1}>
      Series Cast
     </Typography>

     <Cast data={casts.cast} url={url} layout="row" />
    </Box>

    {/* CREW CAST */}
    <Box sx={{ flex: 1, minWidth: 0 }}>
     <Typography variant="h5" fontWeight={600} mb={1}>
      Crew Cast
     </Typography>

     <Cast data={casts.crew} url={url} layout="row" showRole={false} />
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
    <Keywords url={url} />
   </Box>
   <Box sx={{ display: "grid",
     gap: 0.1,
     m: 2,
     alignItems: "start",
     gridTemplateColumns: {
      xs: "1fr",
      md: "1.3fr 0.7fr",
     }, }}>
    <Reviews />
    <Videos />
   </Box>
  </>
 );
}

export default ShowExtraDetails;
