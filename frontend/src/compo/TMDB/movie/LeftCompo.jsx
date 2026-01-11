import { Box, Button, Typography } from "@mui/material";
import Cast from "../oth/show/Cast";
import { Link, useParams } from "react-router";
import Reviews from "../oth/show/Reviews";

function LeftCompo({ cast, type, imgUrl }) {
 const { id } = useParams();

 return (
  <>
   <Box sx={{ flex: 1, minWidth: 0 }}>
    <Typography variant="h5" fontWeight={600} mb={1}>
     Series Cast
    </Typography>

    <Cast cast={cast} url={imgUrl} />
    <Button
     component={Link}
     to={`/tmdbapp/${type}/${id}/cast`}
     variant="text"
     disableRipple
     sx={{
      textTransform: "none",
      width: "fit-content",
      color: "text.primary",
      transition: "all .3s ease-in-out",
      fontWeight: "600",
      fontSize: "1rem",

      "&:hover": {
       backgroundColor: "transparent",
       textDecoration: "underline",
       opacity: 0.7,
      },

      "&:active": {
       backgroundColor: "transparent",
      },
     }}
    >
     Full Cast&Crew →
    </Button>
    <Box sx={{ pt: 3, px: 2 }}>
     <Typography fontWeight={600} fontSize={"1.25rem"}>
      {" "}
      Reviews
     </Typography>
     <Reviews type={type} />
    </Box>
   </Box>
  </>
 );
}

export default LeftCompo;
