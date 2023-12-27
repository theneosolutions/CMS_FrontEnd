import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";

const SidebarItemCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const appState = useSelector((state) => state.appState);
  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return item.sidebarProps ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&:hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          paddingY: "12px",
          paddingX: "24px",
        }}>
        <ListItemIcon
          sx={{
            color: colorConfigs.sidebar.color,
          }}>
          <a className="text-gray-300 ml-2">
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </a>
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography className="text-gray-300">
              {t(item.sidebarProps.displayText)}
            </Typography>
          }
        />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item?.child?.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}
        </List>
      </Collapse>
    </>
  ) : null;
};

export default SidebarItemCollapse;
