import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "../Card";
import useApiStore from "./store";
import Searchbtn from "../search/compo/Searchbtn";

const drawerWidth = 240;
const navItems = ["Movies", "TV Shows", "People", "More"];

function NavBar({ window }) {
 const [mobileOpen, setMobileOpen] = React.useState(false);

 const popular = useApiStore((s) => s.popular);
 const topRated = useApiStore((s) => s.topRated);
 const trendingAll = useApiStore((s) => s.trendingAll);
 const fetchPopular = useApiStore((s) => s.fetchPopular);
 const fetchTopRated = useApiStore((s) => s.fetchTopRated);
 const fetchTrendingAll = useApiStore((s) => s.fetchTrendingAll);
 const loadingPopular = useApiStore((s) => s.loadingPopular);
 const loadingTopRated = useApiStore((s) => s.loadingTopRated);
 const loadingTrending = useApiStore((s) => s.loadingTrending);

 React.useEffect(() => {
  fetchPopular();
  fetchTopRated();
  fetchTrendingAll();
 }, [fetchPopular, fetchTopRated, fetchTrendingAll]);

 const handleDrawerToggle = () => {
  setMobileOpen((prev) => !prev);
 };

 const drawer = (
  <Box sx={{ textAlign: "center", p: 2 }}>
   <Typography variant="h6" sx={{ my: 2, fontWeight: 700, letterSpacing: 2 }}>
    TMDB
   </Typography>

   <Divider />

   <List>
    {navItems.map((item) => (
     <ListItem key={item} disablePadding>
      <ListItemButton sx={{ justifyContent: "center" }}>
       <ListItemText
        primary={item}
        sx={{ textAlign: "center", whiteSpace: "nowrap" }}
       />
      </ListItemButton>
     </ListItem>
    ))}
   </List>
  </Box>
 );

 const container =
  window !== undefined ? () => window().document.body : undefined;

 return (
  <Box>
   <CssBaseline />

   {/* APP BAR */}
   <AppBar position="sticky">
    <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
     {/* MOBILE MENU */}
     <IconButton
      color="inherit"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" } }}
     >
      <MenuIcon />
     </IconButton>

     {/* LOGO */}
     <Typography
      variant="h6"
      sx={{
       fontWeight: 800,
       fontSize: "1.8rem",
       letterSpacing: "3px",
       display: { xs: "none", sm: "block" },
      }}
     >
      TMDB
     </Typography>

     {/* DESKTOP NAV */}
     <Box
      sx={{
       display: { xs: "none", sm: "flex" },
       alignItems: "center",
       gap: 2,
       ml: 4,
      }}
     >
      {navItems.map((item) => (
       <Button
        key={item}
        sx={{
         color: "#fff",
         textTransform: "none",
         width: "fit-content",
         fontWeight: 500,
         whiteSpace: "nowrap",
        }}
       >
        {item}
       </Button>
      ))}
     </Box>
    </Toolbar>
   </AppBar>

   {/* MOBILE DRAWER */}
   <Drawer
    container={container}
    variant="temporary"
    open={mobileOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
    sx={{
     display: { xs: "block", sm: "none" },
     "& .MuiDrawer-paper": { width: drawerWidth },
    }}
   >
    {drawer}
   </Drawer>

   {/* MAIN CONTENT */}
   <Box component="main" sx={{ p: 3 }}>
    <Box sx={{ mb: 3 }}>
     <Searchbtn />
    </Box>

    <Card movie={popular} load={loadingPopular}>
     <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, px: 2 }}>
      Popular
     </Typography>
    </Card>

    <Card movie={topRated} load={loadingTopRated}>
     <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, px: 2 }}>
      Top Rated
     </Typography>
    </Card>

    <Card movie={trendingAll} load={loadingTrending}>
     <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, px: 2 }}>
      Trending
     </Typography>
    </Card>
   </Box>
  </Box>
 );
}

NavBar.propTypes = {
 window: PropTypes.func,
};

export default NavBar;
