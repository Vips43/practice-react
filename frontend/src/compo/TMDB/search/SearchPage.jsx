import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import useApiStore from "../oth/store";
import SearchCard from "./SearchCard";

function SearchPage() {
 const searchMovie = useApiStore((state) => state.searchMovie);
 const movie = useApiStore((state) => state.searchResults);
 const query = useApiStore((state) => state.query);
console.log(query)
 React.useEffect(() => {
  if (!query) return;
  searchMovie(query);
 }, [query, searchMovie]);

 //  useEffect(() => {
 //   return () => {
 //    useApiStore.setState({ query: "", searchQuery: [] });
 //    console.clear();
 //   };
 //  }, []);

 return (
  <>
   <Box>
    <Typography variant="h5" sx={{ px: 2, fontWeight: "700" }}>
     searched for: {query}
    </Typography>
    <Box
     sx={{
     }}
    >
     <SearchCard movie={movie} />
    </Box>
   </Box>
  </>
 );
}

export default SearchPage;
