import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import { useTranslation } from "react-i18next";

const SidebarItem = ({ item }) => {
  const { appState } = useSelector((state) => state.appState);
  const { t } = useTranslation();

  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        "&:hover": {
          backgroundColor: colorConfigs.sidebar.hoverBg,
        },
        backgroundColor:
          appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
        paddingY: "12px",
        paddingX: "24px",
      }}>
      <ListItemIcon
        sx={{
          color: colorConfigs.sidebar.color,
        }}>
        {item.sidebarProps.icon && item.sidebarProps.icon}
      </ListItemIcon>
      <a className="text-gray-300 text-sm">
        {t(item.sidebarProps.displayText)}
      </a>
    </ListItemButton>
  ) : null;
};

export default SidebarItem;
