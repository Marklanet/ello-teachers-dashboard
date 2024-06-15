import React from "react";
import "./featured.css";
import SchoolIcon from "@mui/icons-material/School";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const featured = [
  {
    cover: DriveFileRenameOutlineIcon,
    name: "Kindergaten",
    total: "122 Books",
  },
  {
    cover: SchoolIcon,
    name: "Grade One",
    total: "155 Books",
  },
  {
    cover: SchoolIcon,
    name: "Grade Two",
    total: "300 Books",
  },
  {
    cover: SchoolIcon,
    name: "Grade Three",
    total: "80 Books",
  },
  {
    cover: FamilyRestroomIcon,
    name: "Parental Blogs",
    total: "70 Blogs",
  },
];

const Featured = () => {
  return (
    <section className="featured">
      <h1>Feautured Learning Materials</h1>
      <div className="maper">
        {featured.map((items, index) => {
          const IconComponent = items.cover;
          return (
            <div className="box" key={index}>
              <IconComponent className="icon" />
              <h4>{items.name}</h4>
              <label>{items.total}</label>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Featured;
