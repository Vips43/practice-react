import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import useApiStore from "../store";
import img from "/No-image.png";

function Cast({
 cast, url, layout = "row", cardWidth = 120, showRole = true,}) {
 const isLoading = useApiStore((state) => state.isLoading);
 const slicedCast = cast?.cast?.slice(0,10)
console.log(slicedCast);
 if (isLoading) {
  return <Typography sx={{ opacity: 0.6, p: 2 }}>Loading cast…</Typography>;
 }

 return (
  <Box
   sx={{ display: "flex", gap: 1, overflow:"auto",py:0.2 }}
   className={layout === "row" ? "no-scrollbar" : ""}
  >
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
      sx={{
       cursor: "default",
       "&:hover": { backgroundColor: "transparent" },
      }}
     >
      <CardMedia
       component="img"
       height="140"
       image={c.profile_path ? `${url}${c.profile_path}` : img}
       alt={c.name}
      />

      <CardContent sx={{ p: 0.5 }}>
       <Typography
        variant="subtitle2"
        sx={{
         fontWeight: 600,
         lineHeight: 1.1,
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
            }}
            >
            {c.roles?.map((r) => ( r?.character )).join(", ")}
         </Typography>

       <Typography
        variant="caption"
        sx={{
         display: "block",
         color: "text.secondary",
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
