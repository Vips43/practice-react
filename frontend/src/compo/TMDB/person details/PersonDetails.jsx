import React, { useEffect, useState } from "react";
import useApiStore from "../oth/store";
import { useParams } from "react-router";
import { Box, Container, Grid, Stack } from "@mui/material";
import LeftPer from "./LeftPer";
import RightPer from "./RightPer";
import { getPersonFull } from "../api";

function PersonDetails() {
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const globalData = useApiStore((s) => s.globalData);
 const { type, id } = useParams();
 
 const [info, setInfo] = useState([]);

 useEffect(() => {
  fetchGlobalAPI(type, id);
 }, [id]);

 
  useEffect(() => {
   if (!id) return;
   const controller = new AbortController();
   const signal = controller;
 
   const getData = async () => {
    const fullData = await getPersonFull(id, { signal });
    setInfo(fullData);
   };
     getData();
   return () => controller.abort();
  }, [id]);
//  console.log("from person details", id, globalData);

 return (
  <>
   <Container maxWidth="xl" sx={{my:2}}>
    <Box
     sx={{
      display: "grid",
      gridTemplateColumns: {
       xs: "1fr",
       sm: "300px 1fr",
       md: "320px 1fr",
      },
      gap: 4,
      alignItems: "start", // 👈 CRITICAL for sticky
     }}
    >
     <Box
      sx={{
       position: "sticky",
       top: 20,
       height: "fit-content",
      }}
     >
      <LeftPer info={info} />
     </Box>

     <RightPer infos={info} />
    </Box>
   </Container>
  </>
 );
}

export default PersonDetails;
