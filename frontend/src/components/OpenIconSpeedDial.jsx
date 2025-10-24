import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EditIcon from "@mui/icons-material/Edit";
import { MdPostAdd, MdCategory, MdHome } from "react-icons/md";

const actions = [
  { icon: <MdHome />, name: "Home", path: "/" },
  { icon: <MdPostAdd />, name: "CreateBlog", path: "/create-blog" },
  { icon: <MdCategory />, name: "CreateCategory", path: "/create-category" },
];

export default function OpenIconSpeedDial() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 60,
        right: 30,
        zIndex: 1300,
      }}>
      <SpeedDial
        ariaLabel="SpeedDial with navigation"
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}>
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<span style={{ fontSize: 24 }}>{action.icon}</span>}
            slotProps={{
              tooltip: {
                open: true,
                title: (
                  <span
                    style={{
                      fontWeight: "550",
                      color: "#31616b",
                    }}>
                    {action.name}
                  </span>
                ),
              },
            }}
            onClick={() => navigate(action.path)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
