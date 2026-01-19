import { Box, IconButton, Tooltip } from "@mui/material";
import useNavStore from "./NavStore";

export default function ProviderLogos() {
 const imgUrl = `https://image.tmdb.org/t/p/original`;
 
  const providers = useNavStore((s) => s.providers);


 if (!providers) return <div>No data found...</div>;

 return (
  <>
   {providers &&
    providers.map((provider,i) => (
     <Tooltip
     key={i}
      title={provider.provider_name || ""}
      placement="top"
      arrow
      slotProps={{
       tooltip: { sx: { fontSize: "0.7rem" } },
       popper: {
        modifiers: [
         {
          name: "offset",
          options: {
           offset: [0, -5],
          },
         },
        ],
       },
      }}
     >
      <IconButton
       sx={{
        p: 0,
        m: 0,
        minWidth: 0,
        width: "30px",
        height: "30px",
        aspectRatio: "square",
       }}
      >
       <Box
        component="img"
        src={`${imgUrl}${provider.logo_path}`}
        sx={{
         width: "100%",
         height: "100%",
         m: 2,
         objectFit: "cover",
         display: "block",
        }}
       />
      </IconButton>
     </Tooltip>
    ))}
  </>
 );
}
