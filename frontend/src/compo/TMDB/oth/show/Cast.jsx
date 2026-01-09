import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import useApiStore from "../store";

function Cast({
 data = [],
 url,
 layout = "row", // "row" | "grid"
 cardWidth = 120,
 showRole = true,
}) {
 const isLoading = useApiStore((state) => state.isLoading);

 if (isLoading) {
  return <Typography sx={{ opacity: 0.6, p: 2 }}>Loading cast…</Typography>;
 }

 return (
  <Box
   sx={{
    display: layout === "grid" ? "grid" : "flex",
    gridTemplateColumns:
     layout === "grid" ? "repeat(auto-fill, minmax(120px, 1fr))" : "none",
    gap: 0.5,
    overflowX: layout === "row" ? "auto" : "visible",
    pb: 1,
   }}
   className={layout === "row" ? "no-scrollbar" : ""}
  >
   {data.map((c) => (
    <Card
     key={c.id}
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
       image={c.profile_path ? `${url}${c.profile_path}` : "/no-avatar.png"}
       alt={c.name}
       sx={{ p: 0.5 }}
      />

      <CardContent sx={{ p: 0.5 }}>
       <Typography
        variant="subtitle2"
        sx={{
         fontWeight: 600,
         lineHeight: 1.1,
         whiteSpace: "nowrap",
         overflow: "hidden",
         textOverflow: "ellipsis",
        }}
       >
        {c.name}
       </Typography>

       {showRole && (
        <Typography
         variant="caption"
         sx={{
          lineHeight: 1.1,
          display: "block",
          opacity: 0.85,
         }}
        >
         {c.character || c.job}
        </Typography>
       )}

       <Typography
        variant="caption"
        sx={{
         display: "block",
         color: "text.secondary",
        }}
       >
        {c.known_for_department}
       </Typography>
      </CardContent>
     </CardActionArea>
    </Card>
   ))}
  </Box>
 );
}

export default Cast;
