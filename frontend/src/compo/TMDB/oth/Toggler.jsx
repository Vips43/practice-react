import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

function Toggler({ type, items = [], set }) {
 const [active, setActive] = useState(type);

 const activeIndex = items.findIndex((i) => i.key === active);

 return (
  <Box>
   <Box
    sx={{
     position: "relative",
     display: "inline-flex",
     borderRadius: "999px",
     backgroundColor: "#e9e9e9",
     border: "1px solid #cfcfcf",
     overflow: "hidden",
    }}
   >
    {/* 🔥 SLIDING GRADIENT */}
    <Box
     sx={{
      position: "absolute",
      top: 2, display:"flex", justifyContent:"center", 
      left: 2, alignItems:"center",
      height: "calc(100% - 4px)",
      width: `${100 / items.length}%`,
      transform: `translateX(${activeIndex * 100}%)`,
      background: "linear-gradient(90deg, #90cea1, #3cbec9, #01b4e4)",
      borderRadius: "999px",
      transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
     }}
    />

    {/* BUTTONS */}
    {items.map((item) => {
     const isActive = active === item.key;

     return (
      <Button
       key={item.key}
       disableRipple
       onClick={() => {
        setActive(item.key);
        set(item.key);
       }}
       sx={{
        position: "relative",
        zIndex: 1,
        minWidth: "unset",
        px: 2, display:"grid", placeItems:"center",
        py: 0.3,width:"fit-content",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "none",
        whiteSpace: "nowrap",
        color: "#032541",
        backgroundColor: "transparent",

        "&:hover": {
         backgroundColor: "transparent",
        },
       }}
      >
       {item.label}
      </Button>
     );
    })}
   </Box>
  </Box>
 );
}

export default Toggler;
