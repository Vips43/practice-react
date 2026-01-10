import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import useApiStore from "../oth/store";
import SearchCard from "./SearchCard";
import SearchList from "./SearchList";
import SearchPeople from "./SearchPeople";
import SearchNetwork from "./SearchNetwork";
import SearchKeyword from "./SearchKeyword";
import SearchCompany from "./SearchCompany";

function SearchPage() {
 const searchMovie = useApiStore((state) => state.searchMovie);
 const movie = useApiStore((state) => state.searchResults);
 const query = useApiStore((state) => state.query);
 const searchtype = useApiStore((state) => state.searchtype);

 useEffect(() => {
  if (!query) return;
  searchMovie(query, searchtype);
 }, [query, searchtype, searchMovie]);
 
 if (query && searchtype) console.log(query, searchtype);

 return (
  <Box sx={{ px: 2 }}>
   <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
    searched for: {query}
   </Typography>

   {/* MAIN LAYOUT */}
   <Box
    sx={{
     display: "flex",
     gap: 3,
     alignItems: "flex-start",
    }}
   >
    {/* LEFT SIDEBAR */}
    <Box sx={{ width: 260, flexShrink: 0, position:"sticky", top:5 }}>
     <SearchList />
    </Box>

    {/* RIGHT CONTENT */}
    <Box sx={{ flex: 1 }}>
     {searchtype === "movie" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "tv" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "person" ? <SearchPeople movie={movie?.results} /> : ""}
     {searchtype === "collection" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "network" ? <SearchNetwork movie={movie} /> : ""}
     {searchtype === "keyword" ? <SearchKeyword movie={movie} /> : ""}
     {searchtype === "company" ? <SearchCompany movie={movie} /> : ""}

     {/* <Outlet /> */}
    </Box>
   </Box>
  </Box>
 );
}

export default SearchPage;
