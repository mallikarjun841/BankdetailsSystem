import { Component, useState } from "react";
import Cookies from "js-cookie";

import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const [data, setdata] = useState({ email: "", password: "", error: "" });
  const navigate = useNavigate();

  const makecallpage = (data) => {
    Cookies.set("jwt_token", data, { expires: 2 });
    navigate("/");
  };

  const onsubmittingform = async (event) => {
    event.preventDefault();

    const { email, password } = data;
    const userDetails = { email, password };
    const url = "http://localhost:5001/userdetails/";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, option);
    const responsedata = await response.json();
    console.log(response);
    if (response.ok === true) {
      makecallpage(responsedata.token);
      console.log(responsedata.token);
    } else {
      setdata((object) => ({ ...object, error: event.target.value }));
    }
  };

  const onchangeuseranme = (event) => {
    setdata((object) => ({ ...object, email: event.target.value }));
  };

  const onchangepassword = (event) => {
    setdata((object) => ({ ...object, password: event.target.value }));
  };
  const token = Cookies.get("jwt_token");

  if (token !== undefined) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="maincontainer">
      <div className="container">
        <h1 className="logindata">Login</h1>
        <form onSubmit={onsubmittingform} className="formcontainer">
          <label className="name" htmlFor="username">
            Email
          </label>
          <input
            placeholder="Username"
            value={data.email}
            onChange={onchangeuseranme}
            autoComplete="off"
            className="inputname"
            type="email"
            id="username"
            required
          />
          <label className="name" htmlFor="password">
            Password
          </label>
          <input
            value={data.password}
            onChange={onchangepassword}
            className="inputpassword"
            type="password"
            id="password"
            placeholder="password"
            required
          />
          <button className="loginbutton" type="submit">
            Login
          </button>
        </form>
        <p className="error">{data.error}</p>
      </div>
    </div>
  );
};

export default LoginPage;
