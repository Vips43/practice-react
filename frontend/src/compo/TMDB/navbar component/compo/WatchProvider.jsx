import { Box, Typography } from "@mui/material";
import ProviderLogos from "./ProviderLogos";
import Selector from "./Selector";
import { useEffect } from "react";
import { fetchCountries } from "../../api";
import useNavStore from "./NavStore";

function WatchProvider() {
 const setCountry = useNavStore((s) => s.setCountry);
 const setProviders = useNavStore((s) => s.setProviders);
 const selected = useNavStore((s) => s.selected);

 useEffect(() => {
  const getData = async () => {
   const data = await fetchCountries();
   setCountry(data);
  };
  getData();
 }, []);

 useEffect(() => {
  setProviders(selected);
 }, [selected]);

 return (
  <>
   <Box
    sx={{
     width: 225,
     border: "1px solid grey",
     borderRadius: 2,
     m: 2,
     display: "grid",
     justifyItems: "center",
    }}
   >
    <Typography
     sx={{
      textAlign: "left",
      width: "100%",
      placeSelf: "start",
      p: 2,
      fontWeight: "600",
      borderBottom: "1px solid lightgrey",
     }}
    >
     Where to Watch
    </Typography>
    <Typography sx={{ fontSize: ".8rem", mt: 1 }}>
     Search by Watch Providers
    </Typography>
    <Selector />
    <Box
     sx={{
      display: "flex",
      justifyContent: "center",
      gap: 0.5,
      my: 2,
      flexWrap: "wrap",
      maxHeight: "200px",
      overflow: "auto",
     }}
     className="no-scrollbar"
    >
     <ProviderLogos />
    </Box>
   </Box>
  </>
 );
}

export default WatchProvider;
