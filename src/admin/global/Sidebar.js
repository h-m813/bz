import React from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import { Box,} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { logout } from "../../redux/slices/userSlice"; 


const SidebarAdm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { confirm } = Modal;
  const handleLogout = () => {
    confirm({
      title: "Are you sure you want to Log out?",
      icon: <ExclamationCircleOutlined />,
      content: "Your current session will be terminated.",
      onOk() {
        dispatch(logout());
        localStorage.clear();
        message.success("Logout Successfully");
         setTimeout(() => {
          navigate("/login");
        }
        ,500); 
      },
    });
  };

  return (
    <>
      <Sidebar backgroundColor="white" style={{ borderRightStyle: "none" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#000",
                  },
                  [`&.${menuClasses.disabled}`]: {
                    color: "green",
                  },
                  "&:hover": {
                    backgroundColor: "#fafafa",
                    color: "#1976d2",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: "#1976d2",
                  },
                },
              }}
            >
              <MenuItem
                style={{ marginTop: "20px", color: "#000" }}
                display="flex"
                alignItems="center"
                component={<Link to="/dashboard" />}
              >
                {/* <img
                  src={logo }
                  src={"Admin"}
                  alt="Admin"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                /> */}
                <b> {user.name}</b>
              </MenuItem>
              <MenuItem style={{ color: "#1976d2" }}>{user.email}</MenuItem>
              <hr />
              <MenuItem
                component={<Link to="/dashboard" />}
                icon={<DashboardIcon />}
              >
                {" "}
                Dashboard{" "}
              </MenuItem>
              
              <MenuItem
                component={<Link to="/admin/profile" />}
                icon={<ManageAccountsIcon />}
              >
                {" "}
                Manage Accounts{" "}
              </MenuItem>
            </Menu>
          </Box>

          {/* Log Out  */}
          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#000",
                  },

                  "&:hover": {
                    backgroundColor: "#fafafa",
                    color: "#1976d2",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    color: "#1976d2",
                  },
                },
              }}
            >
              <hr />
              <MenuItem onClick={handleLogout} icon={<LoginIcon />}>
                {" "}
                Log out{" "}
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  );
};

export default SidebarAdm;
