import { Menu } from "@mui/material";
import { Typography, MenuItem, Box } from "@mui/material";
import MoreIcon from "components/@extended/MoreIcon";

import React, { useCallback, useState } from "react";

interface MenuOption {
  value: string;
  icon?: React.ReactNode;
  color?: string;
  visible?: boolean;
  loading?: boolean;
  content?: (successCb: () => void, errorCb: () => void) => void; // Define the content function type more precisely
}

interface MenuListProps {
  option: MenuOption[];
  onClick?: () => void; // Optional click handler for the Menu
}

const MenuList: React.FC<MenuListProps> = ({
  option,
  onClick,
}: MenuListProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Explicit type for anchorEl
  const [loading, setLoading] = useState(""); // State to manage loading
  const handleMenuOpen = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(
    (
      content: MenuOption["content"], // Use the correct type for content from MenuOption,
      value: string // Assuming you want to pass the value as well
    ) => {
      if (typeof content === "function") {
        if (["Fetch Port"].includes(value)) {
          setLoading(value);
        }
        return content(
          () => {
            setAnchorEl(null); // Only close on successful completion
            setLoading(""); // Reset loading state
          },
          () => {
            setLoading(""); // Reset loading state on error
            //Do NOT set anchorEl to null here.  Leave menu open on error.
            setAnchorEl(null);
          }
        );
      } else {
        // If content is not a function, still close the menu.
        setAnchorEl(null);
      }
    },
    []
  );
  return (
    <div style={{ display: "flex", justifyItems: "center" }}>
      {/* Removed the Button, just using MoreIcon */}
      <MoreIcon
        onClick={handleMenuOpen}
        style={{ cursor: "pointer" }}
        color="#1d2630"
        data-testid="more-options"
        aria-controls={Boolean(anchorEl) ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? "true" : undefined}
      />
      {/* <div style={{ position: "absolute" }}> */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClick={onClick} // Use the prop, not props.onClick
        className=""
      >
        {option?.map((ele, idx) => (
          <MenuItem
            key={idx} // Add a key for React's list rendering
            disabled={ele?.visible}
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling

              handleMenuClose(ele?.content, ele?.value); // Ensure loading is a boolean
            }}
            sx={{
              visibility: ele?.visible ? "hidden" : "visible",
              pb: ele?.visible ? 0 : "inherit", // Use 'inherit' for no padding if not visible
              gap: 1,
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
            {loading === ele?.value ? (
              <div className="grid  w-full place-items-center overflow-x-scroll rounded-lg  lg:overflow-visible">
                <svg
                  className="text-gray-300 animate-spin"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                >
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="text-gray-900"
                  ></path>
                </svg>
              </div>
            ) : null}
          </MenuItem>
        ))}
      </Menu>
    </div>
    // </div>
  );
};

export default MenuList;
