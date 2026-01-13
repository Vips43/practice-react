import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "../Card";
import useApiStore from "./store";
import Searchbtn from "../search/compo/Searchbtn";
import Toggler from "./Toggler";
import "../../../../src/App.css";

function NavBar({ window }) {
 const [pType, setPType] = React.useState("now_playing");
 const [pStatus, setPStatus] = React.useState("airing_today");
 const [rType, setRType] = React.useState("movie");
 const [tType, setTType] = React.useState("day");

 const popular = useApiStore((s) => s.popular);
 const popularMovie = useApiStore((s) => s.popularMovie);
 const topRated = useApiStore((s) => s.topRated);
 const trending = useApiStore((s) => s.trending);
 const fetchPopular = useApiStore((s) => s.fetchPopular);
 const fetchPopularMovie = useApiStore((s) => s.fetchPopularMovie);
 const fetchTopRated = useApiStore((s) => s.fetchTopRated);
 const fetchTrending = useApiStore((s) => s.fetchTrending);
 const loadingPopular = useApiStore((s) => s.loadingPopular);
 const loadingTopRated = useApiStore((s) => s.loadingTopRated);
 const loadingTrending = useApiStore((s) => s.loadingTrending);

 const item1 = [
  { label: "Movies", key: "movie" },
  { label: "TV-Show", key: "tv" },
 ];
 const item2 = [
  { label: "Today", key: "day" },
  { label: "This-week", key: "week" },
 ];
 const item3 = [
  { label: "Streaming", key: "airing_today" },
  { label: "On Air", key: "on_the_air" },
  { label: "Popular", key: "popular" },
 ];
 const item4 = [
  { label: "Streaming", key: "now_playing" },
  { label: "Popular", key: "popular" },
  { label: "Top Rated", key: "top_rated" },
  { label: "Upcoming", key: "upcoming" },
 ];

 React.useEffect(() => {
  fetchPopular(pStatus);
  fetchPopularMovie(pType)
  fetchTopRated(rType);
  fetchTrending(tType);
 }, [pType, pStatus, rType, tType, fetchPopular, fetchTopRated, fetchTrending]);

 return (
  <Box>
   <CssBaseline />

   {/* ================= NAV BAR (ONLY LOGO + SEARCH) ================= */}
   <AppBar
    position="sticky"
    sx={{
     backgroundColor: "#0d253f",
    }}
   >
    <Toolbar
     sx={{
      minHeight: { xs: 56, sm: 64 },
      display: "flex",
      alignItems: "center",
      justifyContent:"space-between",
      gap: 2,
     }}
    >
     {/* LOGO */}
     <Typography
      variant="h6"
      className="tmdb"
      sx={{
       fontWeight: 800,
       letterSpacing: "0.15em",
       display: "inline-block",
       color: "transparent",
       whiteSpace: "nowrap",
      }}
     >
      TMDB
     </Typography>

     {/* SEARCH BAR */}
     <Box sx={{ flex: 1, maxWidth: 520, ml: "auto" }}>
      <Searchbtn />
     </Box>
    </Toolbar>
   </AppBar>

   {/* ================= MAIN CONTENT (UNCHANGED) ================= */}
   <Box component="main" sx={{ p: 3 }}>
    <Card movie={popular} load={loadingPopular}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: {xs:"1rem", sm:"1.5rem"}, whiteSpace:"wrap", fontWeight: 600, px: 2 }}>
       What's Popular on TV show
      </Typography>
      <Toggler type={pStatus} set={setPStatus} items={item3} />
     </Box>
    </Card>

    <Card movie={popularMovie} load={loadingPopular}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: {xs:"1rem", sm:"1.5rem"}, whiteSpace:"wrap",fontWeight: 600, px: 2 }}>
       What's Popular on Movies
      </Typography>
      <Toggler type={pType} set={setPType} items={item4} />
     </Box>
    </Card>

    <Card movie={topRated} load={loadingTopRated}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: {xs:"1rem", sm:"1.5rem"}, whiteSpace:"wrap", fontWeight: 600, px: 2 }}>
       Top Rated
      </Typography>
      <Toggler type={rType} set={setRType} items={item1} />
     </Box>
    </Card>

    <Card movie={trending} load={loadingTrending}>
     <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontSize: {xs:"1rem", sm:"1.5rem"}, fontWeight: 600, px: 2 }}>
       Trending
      </Typography>
      <Toggler type={tType} set={setTType} items={item2} />
     </Box>
    </Card>
   </Box>
  </Box>
 );
}

NavBar.propTypes = {
 window: PropTypes.func,
};

export default NavBar;
