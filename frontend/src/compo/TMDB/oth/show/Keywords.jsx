import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { keywords } from "../../api";
import { useParams } from "react-router";

function Keywords() {
 const { id } = useParams();
 const [keys, setKeys] = useState(null);

 useEffect(() => {
  const getData = async () => {
   if (!id) return;
   const data = await keywords(id);
   setKeys(data);
  };

  getData();
 }, [id]);

 if (!keys) {
  return <Typography sx={{ opacity: 0.5 }}>Loading keywords…</Typography>;
 }

 if (!keys.results?.length) {
  return <Typography sx={{ opacity: 0.5 }}>No keywords available</Typography>;
 }

 return (
  <Box
   sx={{
    border: "1px solid #2f2f2f",
    borderRadius: 2,
    p: 2,
    background: "#1f1f1f",
   }}
  >
   <Typography
    variant="subtitle1"
    sx={{
     fontWeight: 600,
     mb: 1,
     opacity: 0.8,
     color:"white",
    }}
   >
    Keywords
   </Typography>

   <Box
    sx={{
     display: "flex",
     flexWrap: "wrap",
     gap: 1,
    }}
   >
    {keys.results.map((k) => (
     <Chip
      key={k.id}
      label={k.name}
      size="small"
      sx={{
       backgroundColor: "#2c2c2c",
       color: "#fff",
       fontSize: "0.75rem",
       "&:hover": {
        backgroundColor: "#3a3a3a",
       },
      }}
     />
    ))}
   </Box>
  </Box>
 );
}

export default Keywords;
