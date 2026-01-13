import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import useApiStore from "../store";
import img from "/No-image.png";

function Cast({ cast, url, cardWidth = 120 }) {

 const isLoading = useApiStore((state) => state.isLoading);
 const slicedCast = cast?.cast?.slice(0, 10);
 if (isLoading) {
  return (
   <Typography sx={{ opacity: 0.6, p: 2 }} className="animate-bounce">
    Loading cast…
   </Typography>
  );
 }

 return (
  <Box sx={{ display: "flex", gap: 1, overflow: "auto", py: 0.2, background:"white" }}
   className={"no-scrollbar"} >
   {slicedCast?.map((c, i) => (
    <Card
     key={i}
     sx={{
      width: cardWidth,
      flexShrink: 0,
     }}
    >
     <CardActionArea
      disableRipple
      sx={{ cursor: "default", "&:hover": { backgroundColor: "transparent" },
      }}
     >
      <CardMedia
       component="img"
       height="140"
       image={c.profile_path ? `${url}${c.profile_path}` : img}
       alt={c.name || c.character}
      />

      <CardContent sx={{ p: 0.5 }}>
       <Typography
        variant="subtitle2"
        sx={{
         fontWeight: 600,
         lineHeight: 1,
        }}
       >
        {c.name}
       </Typography>

       <Typography
        variant="caption"
        sx={{
         lineHeight: 1.1,
         display: "block",
         opacity: 0.85,
         overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical'
        }}
       >
        {c.roles?.map((r) => r?.character).join(", ")}
       </Typography>

       <Typography
        variant="caption"
        sx={{
         display: "block",
         mt:1,
         color: "text.secondary",
         lineHeight:1
        }}
       >
        {c.known_for_department}
        <span className="block">{c.total_episode_count} episodes</span>
       </Typography>
      </CardContent>
     </CardActionArea>
    </Card>
   ))}
  </Box>
 );
}

export default Cast;
