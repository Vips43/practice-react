import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import useApiStore from "./store";
import { useState } from "react";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
 position: "relative",
 borderRadius: theme.shape.borderRadius,
 backgroundColor: alpha(theme.palette.common.white, 0.15),
 "&:hover": {
  backgroundColor: alpha(theme.palette.common.white, 0.25),
 },
 marginRight: theme.spacing(2),
 marginLeft: 0,
 width: "100%",
 border: "1px solid grey",
 [theme.breakpoints.up("sm")]: {
  marginLeft: theme.spacing(1),
  width: "40%",
 },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 color: "inherit",
 "& .MuiInputBase-input": {
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
   width: "20ch",
  },
 },
}));

function Searchbtn() {
 const navigate = useNavigate();
 const setQuery = useApiStore((state) => state.setQuery);
 const [val, setVal] = useState("");

 const handleClick = () => {
  if (val.trim()) {
   setQuery(val);
   console.log(val);
  }
 };

 return (
  <>
   <Search>
    <StyledInputBase
     placeholder="Search…"
     inputProps={{ "aria-label": "search" }}
     value={val}
     onChange={(e) => setVal(e.target.value)}
     onKeyDown={(e) => {
      if (e.key === "Enter") {
       handleClick();
       navigate(`/search/${val}`);
      }
     }}
    />
   </Search>
  </>
 );
}

export default Searchbtn;
