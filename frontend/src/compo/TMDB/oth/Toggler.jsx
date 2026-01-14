import { memo, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Toggler = memo(function Toggler({ value, items = [], onChange }) {
 const activeIndex = useMemo(
  () => items.findIndex((i) => i.key === value),
  [items, value]
 );

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
    {/* SLIDER */}
    <Box
     sx={{
      position: "absolute",
      top: 2,
      left: 2,
      height: "calc(100% - 4px)",
      width: `${100 / items.length}%`,
      transform: `translateX(${activeIndex * 100}%)`,
      background: "linear-gradient(90deg, #90cea1, #3cbec9, #01b4e4)",
      borderRadius: "999px",
      transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
     }}
    />

    {/* BUTTONS */}
    {items.map((item) => (
     <Button
      key={item.key}
      disableRipple
      onClick={() => onChange(item.key)}
      sx={{
       position: "relative",
       zIndex: 1,
       px: 2,
       py: 0.3,
       minWidth: "unset",
       borderRadius: "999px",
       fontSize: "0.75rem",
       fontWeight: 600,
       textTransform: "none",
       whiteSpace: "nowrap",
       color: "#032541",
       backgroundColor: "transparent",
       "&:hover": { backgroundColor: "transparent" },
      }}
     >
      {item.label}
     </Button>
    ))}
   </Box>
  </Box>
 );
});

export default Toggler;
