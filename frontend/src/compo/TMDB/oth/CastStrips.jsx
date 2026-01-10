import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img from "/No-image.png";
import useApiStore from "./store";

function CastStrips({ data = [], title }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
const isLoading = useApiStore(s=> s.isLoading)
 if (isLoading) {
  return (
   <div className="mt-14 text-2xl font-bold grid place-items-center animate-ping ">Loading...</div>
  );
 }
 return (
  <Box sx={{  }} className="space-y-2">
   {title && <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>{title} <span className="opacity-35">{data.length}</span></Typography>}

   {data.map((f,i) => {
    const isCast = Array.isArray(f.roles);

    return (
     <Card
      key={i}
      sx={{
       display: "flex",
       alignItems: "flex-start",
       gap: 3,
       boxShadow: "none",
       height:"fit-content"
      }}
     >
      {/* IMAGE */}
      <CardMedia
       component="img"
       image={f.profile_path ? `${imgUrl}${f.profile_path}` : img}
       alt={f.name}
       sx={{
        width: 64,
        height: 64,
        minWidth: 64,
        objectFit: "cover",
        borderRadius: 2,
        flexShrink: 0,
       }}
      />

      {/* CONTENT */}
      <CardContent sx={{ pt: 1 }}>
       <Typography
        variant="body1"
        sx={{
         fontWeight: 600,
         lineHeight: 1.2,
         "&:hover": { textDecoration: "underline" },
        }}
       >
        {f.name}
       </Typography>

       {/* CAST */}
       {isCast && (
        <Typography
         variant="body2"
         sx={{ fontSize: "0.8rem", color: "text.secondary", whiteSpace:"wrap" }}
        >
         {f.roles.map((r, i) => (
          <span key={i}>
           <strong>{r.character}</strong>{" "}
           <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
           {i < f.roles.length - 1 && ", "}
          </span>
         ))}
        </Typography>
       )}

       {/* CREW */}
       {!isCast && (
        <Typography
         variant="body2"
         sx={{ fontSize: "0.8rem", color: "text.secondary" }}
        >
         {f.jobs.map((r, i) => (
          <span key={i}>
           <strong>{r.job}</strong>{" "}
           <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
           {i < f.jobs.length - 1 && ", "}
          </span>
         ))}
        </Typography>
       )}
      </CardContent>
     </Card>
    );
   })}
  </Box>
 );
}

export default CastStrips;
