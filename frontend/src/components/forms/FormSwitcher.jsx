import React, { useState } from "react";
import Signin from "./signinform/Signin";
import img1 from "../../assets/icons/try7.png";
import img2 from "../../assets/icons/try2.png";
import Signup from "./signupform/Signup";
import "./authforms.css";

/*
  Using form switcher allows flexibility and scallability
  You can easily add or switch forms
*/

const FormSwitcher = ({ chooseUser }) => {
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  return (
    <div className="auth-holder">
      <div className={`switch-container ${signUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            {signUpMode ? <Signup /> : <Signin chooseUser={chooseUser} />}
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>
                Join Thousands of <br />
                Happy Teachers Now{" "}
              </h3>
              <p>New here? Sin up and discover available books</p>
              <button className="btn transparent" onClick={handleSignUpClick}>
                Sign up
              </button>
            </div>
            <div className="img-holder">
              <img src={img1} className="image" alt="sign in" />
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Help Learners to Read with Confidence</h3>
              <p>One of us? Sign in and discover why Ello is rated 4.8/5.</p>
              <button className="btn transparent" onClick={handleSignInClick}>
                Sign in
              </button>
            </div>
            <div className="img-holder">
              <img src={img2} className="image" alt="sign in" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSwitcher;
