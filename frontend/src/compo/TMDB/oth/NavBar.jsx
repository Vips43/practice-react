import * as React from "react";
import PropTypes from "prop-types";
import {
 AppBar,
 Box,
 CssBaseline,
 Toolbar,
 Typography,
 Button,
 Menu,
 MenuItem,
} from "@mui/material";

import Card from "../Card";
import useApiStore from "./store";
import Searchbtn from "../search/compo/Searchbtn";
import Toggler from "./Toggler";
import { useNavigate } from "react-router";

/* ================= MENU DATA ================= */

const movieMenu = [
 { label: "Popular", key: "popular" },
 { label: "Now Playing", key: "now_playing" },
 { label: "Top Rated", key: "top_rated" },
 { label: "Upcoming", key: "upcoming" },
];

const tvMenu = [
 { label: "Airing Today", key: "airing_today" },
 { label: "On The Air", key: "on_the_air" },
 { label: "Popular", key: "popular" },
];

const peopleMenu = [{ label: "Popular People", key: "popular" }];

/* ================= DROPDOWN COMPONENT ================= */

function NavDropdown({ label, items, onSelect }) {
 const [anchorEl, setAnchorEl] = React.useState(null);
 const open = Boolean(anchorEl);

 return (
  <>
   <Button
    onClick={(e) => setAnchorEl(e.currentTarget)}
    sx={{
     color: "#fff",
     fontWeight: 600,
     whiteSpace: "nowrap",
     ":hover": { background: "none", opacity: 0.85 },
    }}
   >
    {label}
   </Button>

   <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
    {items.map((item) => (
     <MenuItem
      key={item.key}
      onClick={() => {
       onSelect(item.key);
       setAnchorEl(null);
      }}
     >
      {item.label}
     </MenuItem>
    ))}
   </Menu>
  </>
 );
}

/* ================= NAVBAR ================= */

function NavBar() {
 const [pType, setPType] = React.useState("movie");
 const [pTV, setPV] = React.useState("airing_today");
 const [pMovie, setPMovie] = React.useState("now_playing");
 const [rType, setRType] = React.useState("movie");
 const [tType, setTType] = React.useState("day");

 
 const navigate = useNavigate();
 const toggle = pType === "tv";

 const popular = useApiStore((s) => s.popular);
 const topRated = useApiStore((s) => s.topRated);
 const trending = useApiStore((s) => s.trending);

 const fetchPopular = useApiStore((s) => s.fetchPopular);
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

 const item3TV = [
  { label: "Streaming", key: "airing_today" },
  { label: "On Air", key: "on_the_air" },
  { label: "Popular", key: "popular" },
 ];

 const item4Movie = [
  { label: "Streaming", key: "now_playing" },
  { label: "Popular", key: "popular" },
  { label: "Top Rated", key: "top_rated" },
  { label: "Upcoming", key: "upcoming" },
 ];

 React.useEffect(() => {
  fetchPopular(pType, toggle ? pTV : pMovie);
  fetchTopRated(rType);
  fetchTrending(tType);
 }, [
  pType,
  toggle,
  pMovie,
  pTV,
  rType,
  tType,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
 ]);

 return (
  <Box>
   <CssBaseline />

   {/* ================= APP BAR ================= */}
   <AppBar position="sticky" sx={{ backgroundColor: "#0d253f" }}>
    <Toolbar
     sx={{
      minHeight: { xs: 56, sm: 64 },
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
       color: "transparent",
       whiteSpace: "nowrap",
      }}
     >
      TMDB
     </Typography>

     {/* MENU + SEARCH */}
     <Box
      sx={{
       display: { xs: "none", sm: "flex" },
       alignItems: "center",
       gap: 1,
       ml: "auto",
      }}
     >
      <NavDropdown
       label="Movies"
       items={movieMenu}
       onSelect={(key) => {
        console.log(key) ; navigate(`/tmdbapp/nav/movie/${key}`)
       }}
      />

      <NavDropdown
       label="TV Shows"
       items={tvMenu}
       onSelect={(key) => { console.log(key); navigate(`/tmdbapp/nav/tv/${key}`) }}
      />

      <NavDropdown
       label="People"
       items={peopleMenu}
       onSelect={(key) => {
        console.log(key); navigate(`/tmdbapp/nav/person/${key}`)
       }}
      />

      <Searchbtn />
     </Box>
    </Toolbar>
   </AppBar>

   {/* ================= MAIN CONTENT ================= */}
   <Box component="main" sx={{ p: 3 }}>
    <Card movie={popular} active={false} load={loadingPopular}>
     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <Typography
       sx={{
        fontSize: { xs: "1rem", sm: "1.5rem" },
        fontWeight: 600,
        width: "100%",
        px: 2,
       }}
      >
       What's Popular on {pType === "tv" ? "TV Shows" : "Movies"}
      </Typography>

      <Toggler value={pType} onChange={setPType} items={item1} />

      {toggle ? (
       <Toggler value={pTV} onChange={setPV} items={item3TV} />
      ) : (
       <Toggler value={pMovie} onChange={setPMovie} items={item4Movie} />
      )}
     </Box>
    </Card>

    <Card movie={topRated} active={false} load={loadingTopRated}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, px: 2 }}>
       Top Rated
      </Typography>
      <Toggler value={rType} onChange={setRType} items={item1} />
     </Box>
    </Card>

    <Card movie={trending} active={false} load={loadingTrending}>
     <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, px: 2 }}>
       Trending
      </Typography>
      <Toggler value={tType} onChange={setTType} items={item2} />
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
