import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
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

  //Handling alerts
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    iconColor: "var(--middle-color)",
    timerProgressBar: true,

    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
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
          Toast.fire({
            icon: "success",
            title: `Login Success`,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: `Error: ${response.message}`,
          });
        }
      } catch (err) {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `An error occurred during login`,
        });
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
          placeholder={
            formik.errors.username ? formik.errors.username : "Username"
          }
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
      </div>
      <div className="input-field">
        <LockIcon className="icon" />
        <input
          type="password"
          placeholder={
            formik.errors.password ? formik.errors.password : "Password"
          }
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </div>
      <button type="submit" className="btn2 btn solid">
        Sign In
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
