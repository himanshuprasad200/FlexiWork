import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { SiGoogleanalytics } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: <SiGoogleanalytics />,
      name: "Account Analytics",
      func: accountAnalytics,
    },
    { icon: <ListAltIcon />, name: "Bids", func: bids },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Post a project",
      func: post,
    });
  }

  function post() {
    navigate("/admin/joinasclient");
  }

  function bids() {
    navigate("/bids");
  }

  function account() {
    navigate("/account");
  }

  function accountAnalytics() {
    navigate("/user/earning");
  }

  function logoutUser() {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            tooltipPlacement="left"
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
