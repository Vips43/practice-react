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
import Searchbtn from "./Searchbtn";
import MovieDetails from "../MOvieDetails";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function NavBar(props) {
 const { window, movie, imgUrl } = props;
 const [mobileOpen, setMobileOpen] = React.useState(false);

 const handleDrawerToggle = () => {
  setMobileOpen((prev) => !prev);
 };

 const drawer = (
  <Box sx={{ textAlign: "center" }}>
   <Typography variant="h6" sx={{ my: 2 }}>
    MUI
   </Typography>
   <Divider />

   <List>
    {navItems.map((item) => (
     <ListItem key={item} disablePadding>
      <ListItemButton sx={{ textAlign: "center" }}>
       <ListItemText primary={item} />
      </ListItemButton>
     </ListItem>
    ))}
   </List>
  </Box>
 );

 const container =
  window !== undefined ? () => window().document.body : undefined;

 return (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
   <CssBaseline />

   {/* AppBar */}
   <AppBar position="sticky">
    <Toolbar
     sx={{
      minHeight: "56px", // mobile
      "@media (min-width:600px)": {
       minHeight: "64px", // desktop
      },
     }}
    >
     {/* Mobile Menu Icon */}
     <IconButton
      color="inherit"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ mr: 2, display: { sm: "none" } }}
     >
      <MenuIcon />
     </IconButton>

     {/* Logo */}
     <Typography
      variant="h6"
      sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
     >
      MUI
     </Typography>

     {/* Desktop Nav Items (Flex) */}
     <Box
      sx={{
       display: { xs: "none", sm: "flex" },
       alignItems: "center",
       gap: 2,
      }}
     >
      {navItems.map((item) => (
       <Button
        key={item}
        sx={{
         color: "#fff",
         textTransform: "none",
        }}
       >
        {item}
       </Button>
      ))}
     </Box>
    </Toolbar>
   </AppBar>

   {/* Mobile Drawer */}
   <Drawer
    container={container}
    variant="temporary"
    open={mobileOpen}
    onClose={handleDrawerToggle}
    ModalProps={{ keepMounted: true }}
    sx={{
     display: { xs: "block", sm: "none" },
     "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
     },
    }}
   >
    {drawer}
   </Drawer>

   {/* Main Content */}
   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

    <div className="w-full px-3 border border-neutral-300 rounded-lg">
     <h3 className="text-2xl font-bold my-2"> What's Popular</h3>
     <div className="w-full flex gap-4 overflow-x-auto no-scrollbar">
      <Card movie={movie} imgUrl={imgUrl} />
     </div>
    </div>
   </Box>
  </Box>
 );
}

NavBar.propTypes = {
 window: PropTypes.func,
};

export default NavBar;
