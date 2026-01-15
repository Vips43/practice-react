import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, Typography } from "@mui/material";
import Keywords from "../oth/show/Keywords";

function OthInfo({ movie, type }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";

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
  <Box sx={{ p: 3, height: "fit-content", background: "white" }}>
   <InsertLinkIcon sx={{ opacity: 0.7 }} />

   <Box sx={{ mt: 4 }}>
    <Typography fontWeight={600}>Status</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {movie?.status || "—"}
    </Typography>

    <Typography variant="subtitle1" fontWeight="bold">
     Original Name
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
     {movie.original_name || "-"}
    </Typography>

    <Typography fontWeight={600}>Original Language</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {getLanguageName(movie?.original_language || "-")}
    </Typography>

    <Typography variant="subtitle1" fontWeight="bold">
     Type
    </Typography>
    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
     {movie.type || "-"}
    </Typography>

    <Typography fontWeight={600}>Budget</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {formatMoney(movie?.budget || "-")}
    </Typography>

    <Typography fontWeight={600}>Revenue</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {formatMoney(movie?.revenue || "-")}
    </Typography>
    <Box>
     {movie.networks && (
      <>
       <Typography variant="subtitle1" fontWeight="bold">
        Network
       </Typography>
       <Box sx={{ mt: 0.5 }}>
        {movie.networks?.map((n) => (
         <Box
          key={n.id}
          component="img"
          src={`${imgUrl}${n.logo_path}`}
          alt={n.name}
          sx={{
           height: 25,
           mr: 2,
           mb: 1,
           display: "block",
          }}
         />
        ))}
       </Box>
      </>
     )}
    </Box>
   </Box>
   <Box sx={{ mt: 4 }}>
    <Keywords type={type} />
   </Box>
  </Box>
 );
}

export default OthInfo;
