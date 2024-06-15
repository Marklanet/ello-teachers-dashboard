import React from "react";
import "./topbar.css";
import profile from "../../../assets/users/user.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="left">
        <img
          src="https://cdn.prod.website-files.com/652e0352ad50feae8734edac/652e0352ad50feae8734f392_favicon.png"
          alt=""
        />

        <h1>Ello for Teachers</h1>
      </div>
      <div className="right">
        <NotificationsActiveIcon className="icon" />
        <img src={profile} alt="" />
      </div>
    </div>
  );
};

export default Topbar;
