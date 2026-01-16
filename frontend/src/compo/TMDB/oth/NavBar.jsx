import * as React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";

import Card from "../Card";
import useApiStore from "./store";
import Searchbtn from "../search/compo/Searchbtn";
import Toggler from "./Toggler";
import NavDropdown from "../navbar component/NavDropdown";
import NavDrawer from "../navbar component/NavDrawer";

/* ================= CONSTANTS ================= */

const MOVIE_MENU = [
 { label: "Popular", key: "popular" },
 { label: "Now Playing", key: "now_playing" },
 { label: "Top Rated", key: "top_rated" },
 { label: "Upcoming", key: "upcoming" },
];

const TV_MENU = [
 { label: "Airing Today", key: "airing_today" },
 { label: "On The Air", key: "on_the_air" },
 { label: "Popular", key: "popular" },
];

const PEOPLE_MENU = [{ label: "Popular People", key: "popular" }];

/* ================= NAVBAR ================= */

function NavBar() {
 const navigate = useNavigate();

 const [mobileOpen, setMobileOpen] = React.useState(false);

 const [pType, setPType] = React.useState("movie");
 const [pTV, setPV] = React.useState("airing_today");
 const [pMovie, setPMovie] = React.useState("now_playing");
 const [rType, setRType] = React.useState("movie");
 const [tType, setTType] = React.useState("day");

 const {
  popular,
  topRated,
  trending,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
  loadingPopular,
  loadingTopRated,
  loadingTrending,
 } = useApiStore();

 const isTvToggle = pType === "tv";

 const mediaTypes = [
  { label: "Movies", key: "movie" },
  { label: "TV-Show", key: "tv" },
 ];

 const timeWindows = [
  { label: "Today", key: "day" },
  { label: "This-week", key: "week" },
 ];

 const popularTvFilters = [
  { label: "Streaming", key: "airing_today" },
  { label: "On Air", key: "on_the_air" },
  { label: "Popular", key: "popular" },
 ];

 const popularMovieFilters = [
  { label: "Streaming", key: "now_playing" },
  { label: "Popular", key: "popular" },
  { label: "Top Rated", key: "top_rated" },
  { label: "Upcoming", key: "upcoming" },
 ];

 React.useEffect(() => {
  fetchPopular(pType, isTvToggle ? pTV : pMovie);
  fetchTopRated(rType);
  fetchTrending(tType);
 }, [
  pType,
  pTV,
  pMovie,
  rType,
  tType,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
 ]);

 return (
  <Box>
   <CssBaseline />

   <AppBar position="sticky" sx={{ bgcolor: "#032541" }}>
    <Toolbar sx={{ display: "flex" }}>
     <MenuIcon
      aria-label="open navigation menu"
      role="button"
      onClick={() => setMobileOpen(true)}
      sx={{ cursor: "pointer", display: { sm: "none" } }}
     />

     <Typography
      variant="h6"
      onClick={() => navigate("/tmdbapp/")}
      sx={{
       fontWeight: 800,
       width: "100%",
       cursor: "pointer",
       background: "linear-gradient(to right, #90cea1, #01b4e4)",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       textAlign: { xs: "center", sm: "left" },
      }}
     >
      TMDB
     </Typography>

     <Box
      sx={{
       display: { xs: "none", sm: "flex" },
       alignItems: "center",
       gap: 1,
       mr: 3,
      }}
     >
      <NavDropdown
       label="Movies"
       items={MOVIE_MENU}
       onSelect={(key) => navigate(`/tmdbapp/nav/movie/${key}`)}
      />
      <NavDropdown
       label="TV Shows"
       items={TV_MENU}
       onSelect={(key) => navigate(`/tmdbapp/nav/tv/${key}`)}
      />
      <NavDropdown
       label="People"
       items={PEOPLE_MENU}
       onSelect={(key) => navigate(`/tmdbapp/nav/person/${key}`)}
      />
     </Box>
     <Searchbtn />
    </Toolbar>
   </AppBar>

   {/* MOBILE DRAWER */}
   <NavDrawer
    mobileOpen={mobileOpen}
    setMobileOpen={setMobileOpen}
    MOVIE_MENU={MOVIE_MENU}
    TV_MENU={TV_MENU}
    PEOPLE_MENU={PEOPLE_MENU}
   />

   {/* ===== MAIN CONTENT (UNCHANGED) ===== */}
   <Box component="main" sx={{ p: 3, maxWidth: "1400px", mx: "auto" }}>
    <Card movie={popular} active={false} load={loadingPopular}>
     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600, whiteSpace: "nowrap" }}>
       What's Popular
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
       <Toggler value={pType} onChange={setPType} items={mediaTypes} />
       <Toggler
        value={isTvToggle ? pTV : pMovie}
        onChange={isTvToggle ? setPV : setPMovie}
        items={isTvToggle ? popularTvFilters : popularMovieFilters}
       />
      </Box>
     </Box>
    </Card>

    <Card movie={topRated} active={false} load={loadingTopRated}>
     <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
       Top Rated
      </Typography>
      <Box>
       <Toggler value={rType} onChange={setRType} items={mediaTypes} />
      </Box>
     </Box>
    </Card>

    <Card movie={trending} active={false} load={loadingTrending}>
     <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
       Trending
      </Typography>
      <Box>
       <Toggler value={tType} onChange={setTType} items={timeWindows} />
      </Box>
     </Box>
    </Card>
   </Box>
  </Box>
 );
}

NavBar.propTypes = { window: PropTypes.func };

export default NavBar;
