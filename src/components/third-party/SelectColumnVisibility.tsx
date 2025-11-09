// material-ui

import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// third-party
import { Column } from "@tanstack/react-table";
import ClosedEyeIcon3 from "assets/svg/closeEye";
import { OpenEyeIcon3 } from "assets/svg/openEye";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

interface Props {
  getVisibleLeafColumns: () => Column<any, unknown>[];
  getIsAllColumnsVisible: () => boolean;
  getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void;
  getAllColumns: () => Column<any, unknown>[];
}

// ==============================|| COLUMN VISIBILITY - SELECT ||============================== //

export default function SelectColumnVisibility({
  getVisibleLeafColumns,
  getIsAllColumnsVisible,
  getToggleAllColumnsVisibilityHandler,
  getAllColumns,
}: any) {
  return (
    <FormControl fullWidth>
      <MenuItem
        value="all"
        onClick={getToggleAllColumnsVisibilityHandler()}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Typography
          variant="body1"
          color={"#4A5567"}
          fontWeight={600}
          sx={{ textTransform: "uppercase", fontSize: "12px" }}
        >
          Column Header
        </Typography>
        <Typography
          sx={{
            color: getIsAllColumnsVisible() ? "#334735" : "black",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {getIsAllColumnsVisible() ? " Hide All" : "Unhide All"}
        </Typography>
      </MenuItem>
      {getAllColumns()?.map(
        (column: any) =>
          // @ts-ignore
          column.columnDef.accessorKey && (
            <MenuItem
              key={column.id}
              value={column.id}
              onClick={column.getToggleVisibilityHandler()}
            >
              <ListItemText primary={column.columnDef.header as string} />

              {column.getIsVisible() ? <OpenEyeIcon3 /> : <ClosedEyeIcon3 />}
            </MenuItem>
          )
      )}
    </FormControl>
  );
}
