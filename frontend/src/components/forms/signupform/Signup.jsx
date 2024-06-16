import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Swal from "sweetalert2";

//Dummy function for user registration
const registerUser = async (username, email, password) => {
  if (username && email && password) {
    return { success: true, message: "Registration successful!" };
  }
  return { success: false, message: "Registration failed" };
};

const RegisterForm = () => {
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
  // Formik validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser(
          values.username,
          values.email,
          values.password
        );
        if (response.success) {
          Toast.fire({
            icon: "success",
            title: `Registration Success`,
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
    <form onSubmit={formik.handleSubmit} className="sign-up-form">
      <h2 className="title">Sign up</h2>
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
        <MailIcon className="icon" />
        <input
          type="email"
          placeholder={formik.errors.email ? formik.errors.email : "Email"}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
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
      <button type="submit" className="btn">
        Sign up
      </button>
      <p className="social-text">Or Sign up with social platforms</p>
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

export default RegisterForm;
