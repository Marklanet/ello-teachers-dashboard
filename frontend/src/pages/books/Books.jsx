import React from "react";
import "./books.css";
import Featured from "./featured/Featured";
import SlidingCarousel from "../../components/reusable/carousel/SlidingCarousel";

const Books = () => {
  return (
    <div className="books-page">
      <h2 className="dark-text-gradient">Trending Reading List</h2>
      <SlidingCarousel />
      <Featured />
    </div>
  );
};

export default Books;
