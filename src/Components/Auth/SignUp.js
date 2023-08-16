import React, { useRef } from "react";
import classes from "./Signup.module.css";
import MainNavbar from "../Layouts/Navbar";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const emailref = useRef();
  const passwordref = useRef();
  const confirmPasswordref = useRef();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    const entredpassword = passwordref.current.value;
    const entredConfirmpassword = confirmPasswordref.current.value;
    if (entredpassword !== entredConfirmpassword) {
      alert("PassWord didnot Match");
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHHRNIW0ntK3SLozKPvvdA63CyOIiA9Hw",
          {
            method: "POST",
            body: JSON.stringify({
              email: entredEmail,
              password: entredpassword,
              returnSecureToken: true,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Authenticaion Failed");
        }
        const data = await response.json();
        console.log(data);
        navigate("/login");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <MainNavbar />
      <section className={classes.auth}>
        <h1>Signup</h1>
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
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordref}
              required
            ></input>
          </div>
          <div className={classes.actions}>
            <button>SignUp</button>
          </div>
        </form>
      </section>
      <div className={classes.auth}>
        <spam>
          Already Have account{" "}
          <a href="/login" style={{ color: "whitesmoke" }}>
            login
          </a>
        </spam>
      </div>
    </div>
  );
};
export default SignUp;
