import React, { useRef } from "react";
import MainNavbar from "../Layouts/Navbar";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../Redux/auth";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailref = useRef();
  const passwordref = useRef();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    const entredpassword = passwordref.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoPNsR-2YbOEhCFPn7RpOqmihhG-wYUD8",
        {
          method: "POST",
          body: JSON.stringify({
            email: entredEmail,
            password: entredpassword,
            returnSecureToken: true,
          }),
          headers: { "content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Authenticaion Failed");
      }
      const data = await response.json();
      console.log(data.idToken);

      dispatch(authAction.login({ token: data.idToken, email: data.email }));

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className={classes.back}>
      <MainNavbar />
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={onsubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" ref={emailref} required></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordref}
              required
            ></input>
          </div>
          <div className={classes.actions}>
            <button>Login</button>
          </div>
        </form>
      </section>
      <div className={classes.auth}>
        <spam>
          Dont Have Account{" "}
          <a href="/signup" style={{ color: "whitesmoke" }}>
            SignUp!
          </a>
        </spam>
      </div>
    </div>
  );
};

export default Login;
