import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import Card from "../Card";
import { Typography } from "@mui/material";
import useApiStore from "./store";

function SearchPage() {
 const searchMovie = useApiStore((state) => state.searchMovie);
 const movie = useApiStore((state) => state.searchResults);
 const query = useApiStore((state) => state.query);

 React.useEffect(() => {
  if (!query) return;
  searchMovie(query);
 }, [query, searchMovie]);

 useEffect(() => {
  return () => {
   useApiStore.setState({ query: "", searchQuery: [] });
   console.clear();
  };
 }, []);

 return (
  <>
   <Box>
    <Typography variant="h5" sx={{ px: 2, fontWeight: "700" }}>
     searched for: {query}
    </Typography>
    <Box
     sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      placeItems: "center",
     }}
    >
     <Card movie={movie} />
    </Box>
   </Box>
  </>
 );
}

export default SearchPage;
