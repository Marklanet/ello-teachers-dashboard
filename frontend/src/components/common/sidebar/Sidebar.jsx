import React, { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import "./sidebar.css";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";

const Sidebar = () => {
  const navLinks = [
    { link_to: "home", title: "Dashboard", icon: HomeIcon },
    {
      link_to: "reading-list",
      title: "Reading List",
      icon: BookmarkBorderIcon,
    },
    { link_to: "books", title: "Books", icon: LibraryBooksRoundedIcon },
  ];

  const [click, setClick] = useState(false);
  const [showsidebar, setShowSidebar] = useState(true);

  const handleClick = () => {
    setClick((prevClick) => !prevClick);
    setShowSidebar(click);
  };

  return (
    <div className="sidebar">
      <div className="showsidebar ontop">
        <Link to="/home" onClick={handleClick}>
          <span>Dashboard</span>
          {click ? (
            <ExpandMoreRoundedIcon className="icon" />
          ) : (
            <ViewStreamIcon className="icon" />
          )}
        </Link>
      </div>

      <div className={showsidebar ? "showsidebar" : "nosidebar"}>
        {navLinks.map((navigationLink, index) => {
          const isActive = useMatch(navigationLink.link_to);
          const IconComponent = navigationLink.icon;
          return (
            <Link
              to={navigationLink.link_to}
              key={index}
              className={`holder ${isActive ? "active-link" : ""}`}
            >
              <span>{navigationLink.title}</span>
              <IconComponent className="icon" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
