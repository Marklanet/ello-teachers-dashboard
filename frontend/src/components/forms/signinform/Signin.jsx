import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

// Dummy function to simulate authentication
const authenticateUser = async (username, password) => {
  if (username === "admin" && password === "password") {
    return { success: true, message: "Authentication successful!" };
  }
  return { success: false, message: "Invalid credentials" };
};

const Signin = ({ chooseUser }) => {
  // Formik validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authenticateUser(
          values.username,
          values.password
        );
        if (response.success) {
          chooseUser({ username: values.username });
          alert("Login successful");
        } else {
          alert(response.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error occurred during login");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="sign-in-form">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <AccountCircleIcon className="icon" />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username && (
          <span className="error">{formik.errors.username}</span>
        )}
      </div>
      <div className="input-field">
        <LockIcon className="icon" />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <span className="error">{formik.errors.password}</span>
        )}
      </div>
      <button type="submit" className="btn2 btn solid">
        Login
      </button>
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <FacebookOutlinedIcon />
        </a>
        <a href="#" className="social-icon">
          <XIcon />
        </a>
        <a href="#" className="social-icon">
          <GoogleIcon />
        </a>
        <a href="#" className="social-icon">
          <LinkedInIcon />
        </a>
      </div>
    </form>
  );
};

export default Signin;
