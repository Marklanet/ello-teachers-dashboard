import React from "react";
import TeacherView from "./teacherdashboard/TeacherView";

/* The app is scallable, we can show different dashboards depending on the user type*/
const DashboardHandler = ({ logedinuser }) => {
  return (
    <section className="dashboard">
      <TeacherView user={logedinuser} />
    </section>
  );
};

export default DashboardHandler;
