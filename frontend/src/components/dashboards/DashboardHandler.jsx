import React from "react";
import TeacherView from "./teacherdashboard/TeacherView";

const DashboardHandler = ({ logedinuser }) => {
  return (
    <section className="dashboard">
      <TeacherView user={logedinuser} />
    </section>
  );
};

export default DashboardHandler;
