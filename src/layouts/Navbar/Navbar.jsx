import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "@mui/material";
import { removeNotifications } from "../../redux/middleware/postInterationThunk";
import { emptyNotifications } from "../../redux/actions";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notifications = useSelector((state) => state.notifications);
  const uid = useSelector((state) => state.uid);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(removeNotifications(uid));
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(emptyNotifications());
  };


  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            DEVCONNECT
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label={`show ${notifications && notifications.length} new notifications`}
              color="inherit"
              aria-describedby={id}
              onClick={handleClick}
            >
              <Badge badgeContent={notifications && notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2 }}>
                {notifications &&
                  notifications.map((notification, index) => {
                    return (
                      <Typography
                        key={`${notification}-${index}`}
                        sx={{
                          p: 1,
                          borderBottom: "1px solid #333",
                          textAlign: "right",
                        }}
                      >
                        {notification}
                      </Typography>
                    );
                  })}
                {notifications && notifications.length == 0 && (
                  <Typography sx={{ p: 2 }}>
                    You do not have any new notifications.
                  </Typography>
                )}
              </Box>
            </Popover>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
