import { connect, useFormik } from "formik";
import * as Yup from "yup";
import "./login.css";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string().min(2).max(25).required(),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(5),
      }),

      onSubmit: async (values, action) => {
        console.log(values);
        const { name, password, email } = values;
        const url = "http://localhost:5001/userregister/";
        const userdatas = { username: name, email, password };
        console.log(userdatas);
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userdatas),
        };
        console.log(option);

        const fetchdata = await fetch(url, option);
        console.log(fetchdata);

        console.log("done");
        action.resetForm();
      },
    });

  // const getdata = async () => {
  //   console.log("wow");

  //   const make = await fetch("http://localhost:5001/userregister/");
  //   const makeresponse = await make.json();
  //   console.log(makeresponse);
  // };

  // useEffect(() => {
  //   getdata();
  // });

  const { name, email, password } = values;
  const token = Cookies.get("jwt_token");

  if (token !== undefined) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="body">
      <div class="box">
        <form onSubmit={handleSubmit}>
          <h1>sign up</h1>
          <div class="inputBox">
            <input
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              autocomplete="off"
              id="name"
              name="name"
              type="text"
              required="required"
            />
            <span>Username</span>
            <i></i>
          </div>
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
          <div class="inputBox">
            <input
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              autocomplete="off"
              id="name"
              name="email"
              type="text"
              required="required"
            />
            <span>Email</span>
            <i></i>
          </div>
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
          <div class="inputBox">
            <input
              autocomplete="off"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="pass"
              type="password"
              name="password"
              required="required"
            />
            <span>password</span>
            <i></i>
          </div>
          <p className="error">
            {errors.password && touched.password && errors.password}
          </p>
          <div>
            <a href="#">Forgot Password</a>
            <a href="/login">signup</a>
          </div>
          <button className="submitbutton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
