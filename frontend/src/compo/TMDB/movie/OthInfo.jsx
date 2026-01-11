import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, Typography } from "@mui/material";

function OthInfo({ movie }) {
 const getLanguageName = (code) => {
  if (!code) return "Unknown";
  try {
   return (
    new Intl.DisplayNames(["en"], { type: "language" }).of(code) || "Unknown"
   );
  } catch {
   return code.toUpperCase();
  }
 };

 const formatMoney = (value) => {
  if (!value || value === 0) return "Not Available";
  return `$${value.toLocaleString()}`;
 };

 return (
  <Box sx={{ p: 3, height: "fit-content" }}>
   <InsertLinkIcon sx={{ opacity: 0.7 }} />

   <Box sx={{ mt: 4 }}>
    <Typography fontWeight={600}>Status</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 2 }}>
     {movie?.status || "—"}
    </Typography>

    <Typography fontWeight={600}>Original Language</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 2 }}>
     {getLanguageName(movie?.original_language)}
    </Typography>

    <Typography fontWeight={600}>Budget</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 2 }}>
     {formatMoney(movie?.budget)}
    </Typography>

    <Typography fontWeight={600}>Revenue</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 2 }}>
     {formatMoney(movie?.revenue)}
    </Typography>
   </Box>
  </Box>
 );
}

export default OthInfo;
