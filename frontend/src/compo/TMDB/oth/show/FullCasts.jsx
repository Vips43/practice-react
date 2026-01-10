import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CastStrips from "../CastStrips";
import useApiStore from "../store";
import { useParams } from "react-router";
import { useEffect } from "react";

function FullCasts() {
 const { id } = useParams();
 const setCasts = useApiStore((state) => state.setCasts);
 const casts = useApiStore((state) => state.casts);
 const isLoading = useApiStore((state) => state.isLoading);

 useEffect(() => {
  setCasts(id);
 }, [id, setCasts]);

 if(isLoading){
    return <div className="mx-auto grid place-items-center text-2xl font-bold my-14">Loading...</div>
 }
 return (
  <>
   <Box sx={{ background:"white",}}>
    <Typography>Series Cast length</Typography>
    <Box sx={{ p: 4, display: "grid", gridTemplateColumns:{ xs:"1fr",sm:"1fr 1fr"}, gap: 2 }}>
     <CastStrips data={casts.cast} title={`Series Cast `} type="cast" />
     <CastStrips data={casts.crew} title={`Series Crew `} type="crew" />
    </Box>
   </Box>
  </>
 );
}

export default FullCasts;
