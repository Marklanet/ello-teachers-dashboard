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

const registerUser = async (username, email, password) => {
  if (username && email && password) {
    return { success: true, message: "Registration successful!" };
  }
  return { success: false, message: "Registration failed" };
};

const RegisterForm = () => {
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
          alert("Registration successful");
        } else {
          alert(response.message);
        }
      } catch (err) {
        console.error(err);
        alert("Error occurred during registration");
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
        <MailIcon className="icon" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <span className="error">{formik.errors.email}</span>
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
