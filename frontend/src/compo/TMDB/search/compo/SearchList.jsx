import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useApiStore from "../../oth/store";

const values = [
 { label: "TV Show", target: "tv" },
 { label: "Movies", target: "movie" },
 { label: "People", target: "person" },
 { label: "Collections", target: "collection" },
 { label: "Keywords", target: "keyword" },
 { label: "Companies", target: "company" },
 { label: "Networks", target: "network" },
 { label: "Awards", target: "award" },
];

const Demo = styled("div")(({ theme }) => ({
 backgroundColor: theme.palette.background.paper,
}));

export default function SearchList() {
 const navigate = useNavigate();
 const movie = useApiStore((state) => state.searchResults);
 const searchtype = useApiStore((state) => state.searchtype);
 const setSearchType = useApiStore((state) => state.setSearchType);

 return (
  <Box
   sx={{
    width: 260, // ✅ FIXED WIDTH
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: 2,
    flexShrink: 0, // ✅ VERY IMPORTANT
   }}
  >
   <Typography
    sx={{
     p: 2,
     background: "#01B4E4",
     color: "white",
     fontWeight: "bold",
    }}
    variant="body1"
   >
    Search Results
   </Typography>

   <Demo>
    <List disablePadding>
     {values.map((item) => {
      const isActive = searchtype === item.target;

      return (
       <ListItemButton
        key={item.target}
        onClick={() => setSearchType(item.target)}
        sx={{
         
         bgcolor: isActive ? "#E6F7FB" : "transparent",
         color: isActive ? "#01B4E4" : "inherit",
         fontWeight: isActive ? "bold" : "normal",
         "&:hover": {
          bgcolor: "#E6F7FB",
         },
        }}
       >
        <ListItemText primary={item.label} sx={{fontSize: ".2rem",}} />
       </ListItemButton>
      );
     })}
    </List>
   </Demo>
  </Box>
 );
}
