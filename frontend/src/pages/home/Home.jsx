import React from "react";
import "./home.css";
import Swiping from "./swiping/Swiping";

const Home = () => {
  return (
    <div className="home-page">
      <h2 className="dark-text-gradient">Swipe The Books</h2>
      <Swiping />
    </div>
  );
};

export default Home;
