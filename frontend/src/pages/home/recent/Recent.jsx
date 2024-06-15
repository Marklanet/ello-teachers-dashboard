import React from "react";
import Heading from "../../../components/reusable/Heading";
import "./recent.css";
import RecentCard from "./RecentCard";

const Recent = () => {
  return (
    <section className="recent">
      <div className="container2">
        <Heading
          title="Recently Featured Properties"
          subtitle="recently advertised houses, apartments for rent, and more"
        />
        <RecentCard />
        <div className="pagination d_flex mb5">
          <button className="btn4">View Less</button>
          <button className="btn4">View More</button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
