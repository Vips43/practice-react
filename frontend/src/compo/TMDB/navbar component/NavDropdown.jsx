import * as React from "react";
import { Typography, Menu, MenuItem } from "@mui/material";

function NavDropdown({ label, items, onSelect }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <Typography
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          color: "#fff",
          fontSize: "0.85rem",
          cursor: "pointer",
          px: 0.5,
          whiteSpace: "nowrap",
          userSelect: "none",
          "&:hover": { opacity: 0.7 },
        }}
      >
        {label}
      </Typography>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        TransitionProps={{ timeout: 200 }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.key}
            onClick={() => {
              onSelect(item.key);
              setAnchorEl(null);
            }}
            sx={{ fontSize: "0.8rem" }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default NavDropdown;
