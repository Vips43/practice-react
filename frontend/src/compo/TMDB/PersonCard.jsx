import Box from "@mui/material/Box";
import Vote from "./oth/Vote";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Pagination, Stack } from "@mui/material";
import useApiStore from "./oth/store";
import img from "/casts.png"

function PersonCard(props) {
 const { person, children, totalPages, setPage } = props;
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const navigate = useNavigate();

 console.log(person);
 if (!person) return <p>no data</p>


 return (
  <Box
   sx={{
    mt: 2,
   }}
  >
   {children}

   <Box
    sx={{
     display: "flex",
     flexWrap:"wrap",
     p: 1,
     gap: 2,
    }}
    className="no-scrollbar"
   >
    {person?.map((per) => (
     <Box
      sx={{
       flexShrink: 0,
       flexBasis:"140px",
       boxShadow: "2px 2px 5px grey",
       cursor: "pointer",
       borderRadius: 1,
       transition: "transform 0.2s",
       "&:hover": {
        opacity: 0.85,
       },
      }}
      onClick={() => {
       console.log("hello from persons");
      }}
     >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
       
       <Box
        component="img"
        src={`${imgUrl}${per?.profile_path}` || `${img}`}
         alt={per.name }
        sx={{
         width: "100%",
         aspectRatio: "2 / 3",
         borderRadius: 1,
         borderBottomRightRadius: 1,
         borderBottomLeftRadius: 1,
        }}
       />

       <Box sx={{ position: "absolute", bottom: -16, left: 8 }}>
        {/* <Vote vote={Math.floor(d.vote_average * 10)} /> */}
       </Box>
      </Box>

      {/* TEXT */}
      <Box sx={{ mt: 3, width: 130, px: 1 }}>
       <Typography fontSize="0.9rem" fontWeight={600} noWrap>
        {per.name} name
       </Typography>
       <Typography fontSize="0.75rem" color="text.secondary">
        {/* {date} */}
       </Typography>
      </Box>
     </Box>
    ))}
   </Box>

   <Box sx={{ width: "100%", display: "flex", mt: 2, mb: 5 }}>
    <Stack spacing={2} sx={{ mx: "auto" }}>
     <Pagination
         count={totalPages}
         onChange={(e, val) => {
          setPage(val);}}

      shape="rounded"
     />
    </Stack>
   </Box>
  </Box>
 );
}

export default PersonCard;
