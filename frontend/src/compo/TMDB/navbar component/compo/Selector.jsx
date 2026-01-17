import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useNavStore from "./NavStore";

function Selector() {
 const selected = useNavStore((s) => s.selected);
 const setSelected = useNavStore((s) => s.setSelected);
 const country = useNavStore((s) => s.country);

//  if (!country || country.length === 0) return;

 return (
  <>
   <FormControl fullWidth sx={{ m: 2, maxWidth: 200 }} size="small">
    <InputLabel>Country</InputLabel>

    <Select
     value={selected || ""}
     label="Country"
     onChange={(e) => setSelected(e.target.value)}
    >
     <MenuItem value="">Select Country</MenuItem>

     {country.map((c) => (
      <MenuItem key={c.iso_3166_1} value={c.iso_3166_1}>
       {c.english_name}
      </MenuItem>
     ))}
    </Select>
   </FormControl>
  </>
 );
}

export default Selector;
