import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import useApiStore from "./store";

function Toggler({type, set}) {
 const items = [
  { label: "Movies", key: "movie" },
  { label: "TV-Show", key: "tv" },
 ];
 const [active, setActive] = useState("movie");


 return (
  <>
   <Box>
    <Box
     sx={{
      display: "flex",
      gap: 1,
      border: "1px solid black",
      borderRadius: "20px",
     }}
    >
     {items.map((item) => (
      <Button
       key={item.key}
       onClick={() => {setActive(item.key); set(item.key)}}
       variant={active === item.key ? "contained" : "text"}
       sx={{
        fontSize: ".75rem",
        whiteSpace: "nowrap",
        borderRadius: "30px",
        py: 0.3,
        px: 1,
        display:"grid",alignItems:"center",
        "&:hover": { background: "transparent", color: "black" },
       }}
      >
       {item.label}
      </Button>
     ))}
    </Box>
   </Box>
  </>
 );
}

export default Toggler;
