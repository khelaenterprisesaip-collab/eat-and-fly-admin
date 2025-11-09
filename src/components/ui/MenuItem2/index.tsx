import { Menu } from "@mui/material";
import { Typography, MenuItem, Box } from "@mui/material";
import MoreIcon from "components/@extended/MoreIcon";

import React, { useState } from "react";

const MenuList2 = ({ option, ...props }: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (content: () => void) => {
    if (typeof content === "function") {
      content();
      setAnchorEl(null);
    }

    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      {/* Removed the Button, just using MoreIcon */}
      <MoreIcon
        onClick={handleMenuOpen}
        style={{ cursor: "pointer" }}
        color="#1d2630"
      />
      <div style={{ position: "absolute" }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          onClick={props.onClick}
        >
          {option?.map((ele: any) => (
            <>
              <MenuItem
                disabled={ele?.visible}
                onClick={() => {
                  handleMenuClose(ele?.content);
                }}
                sx={{
                  visibility: ele?.visible ? "hidden" : "visible",
                  pb: ele?.visible && 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    gap: 10,
                    color: ele?.color,
                    width: "100%",
                  }}
                >
                  {!ele?.visible && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "30px",
                        }}
                      >
                        {ele?.icon}
                      </Box>
                      <Typography>{ele?.value}</Typography>
                    </>
                  )}
                </div>
              </MenuItem>
            </>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default MenuList2;
