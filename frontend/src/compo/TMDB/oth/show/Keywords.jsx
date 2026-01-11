import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { keywords } from "../../api";
import { useParams } from "react-router";

function Keywords({ type }) {
 const { id } = useParams();
 let [keys, setKeys] = useState(null);

 useEffect(() => {
  const getData = async () => {
   if (!id) return;
   const data = await keywords(id, type);
   setKeys(data);
  };
  getData();
 }, [id]);
 
 keys = type === "tv" ? keys?.results : keys?.keywords;
 
//  if (keys.length === 0) return <div>No keywords available</div>;

 if (!keys) {
  return <Typography sx={{ opacity: 0.5 }}>Loading keywords…</Typography>;
 }

 return (
  <Box
   sx={{
    borderRadius: 2,
    p: 2,
    background: "#fff",
   }}
  >
   <Typography
    variant="subtitle1"
    sx={{
     fontWeight: 600,
     mb: 1,
     opacity: 0.8,
     color: "black",
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
    {keys?.map((k) => (
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
