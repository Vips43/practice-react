import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../api.js";
import LeftCompo from "./LeftCompo.jsx";
import RightCompo from "./RightCompo.jsx";

function MovieFullDetail({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();
 let type = "movie";
 const [cast, setCast] = useState([]);

 useEffect(() => {
  if (!id) return;
  const getData = async () => {
   const data = await fetchCast(id, type, "credits");
   setCast(data);
  };
  getData();

  return () => {
   setCast([]);
  };
 }, [id, type]);

 if (cast.results == 0) return "No results found";
 console.log("mFD not render");

 return (
  <>
   <Box
    sx={{
     display: "grid",
     p: 1,
     gap: 1,
     background: "white",
     gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    }}
   >
    <>
     <LeftCompo cast={cast} type={type} imgUrl={imgUrl} />
    </>
    <>
     <RightCompo movie={movie} />
    </>
   </Box>
  </>
 );
}

export default MovieFullDetail;
