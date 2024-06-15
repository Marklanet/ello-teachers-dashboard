import React, { useState } from "react";
import "./App.css";
import FormSwitcher from "./components/forms/FormSwitcher";
import DashboardHandler from "./components/dashboards/DashboardHandler";

const App = () => {
  const [user, setUser] = useState(null);
  const chooseUser = (user) => {
    setUser(user);
  };
  return (
    <section className="app">
      {!user ? (
        <FormSwitcher chooseUser={chooseUser} />
      ) : (
        <DashboardHandler logedinuser={user} />
      )}
    </section>
  );
};

export default App;
