import React from "react";
import { list } from "../../../data/Data";
import { IoLocationSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

const RecentCard = () => {
  return (
    <div className="flexbox mtop mb">
      {list.map((val, index) => {
        const { cover, category, location, name, price, type } = val;
        return (
          <div className="box shadow2 " key={index}>
            <div className="img">
              <img src={cover} alt="" />
            </div>
            <div className="text">
              <div className="category flex">
                <span
                  className="categoryspan"
                  style={{
                    padding: "5px 15px",
                    display: "inline-block",
                    borderRadius: "4px",
                    fontWeight: "550",
                    fontSize: "13px",
                    background:
                      category === "For Sale" ? "#25b5791a" : "#ff98001a",
                    color: category === "For Sale" ? "#25b579" : "#ff9800",
                  }}
                >
                  {category}
                </span>
                <i>
                  <FaHeart />
                </i>
              </div>
              <h4>{name}</h4>
              <div className="location">
                <IoLocationSharp className="locicon" />
                <p>{location}</p>
              </div>
            </div>
            <div className="button ">
              <button className="btn6">{price}</button>
              <span>{type}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentCard;
