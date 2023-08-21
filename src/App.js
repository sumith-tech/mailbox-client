import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Homepage from "./Components/Pages/Homepage";
import "./App.css";
import Footer from "./Components/Layouts/Footer";
import Mailbox from "./Components/Pages/Mailbox";
import { useDispatch, useSelector } from "react-redux";
import Inbox from "./Components/Pages/Inbox";
import Sent from "./Components/Pages/Sent";
import { useEffect, useState } from "react";
import { authAction } from "./Redux/auth";

const App = () => {
  const isLoggin = useSelector((state) => state.auth.email);
  const myemail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const getInbox = async () => {
    console.log(1);
    try {
      const response = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${myemail.replace(
          /[.@]/g,
          ""
        )}/inbox.json`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();

      const loadedinboxBox = [];
      for (const key in data) {
        loadedinboxBox.push({
          id: key,
          from: data[key].from,
          message: data[key].message,
          subject: data[key].subject,
          unread: data[key].unread,
        });
      }

      dispatch(authAction.addinbox(loadedinboxBox));
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    if (isLoggin) {
      const inboxInterval = setInterval(() => {
        getInbox();
      }, 2000);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {isLoggin && <Route path="/" element={<Homepage />}></Route>}
          {isLoggin && <Route path="/mailbox" element={<Mailbox />}></Route>}
          {isLoggin && <Route path="/inbox" element={<Inbox />}></Route>}
          {isLoggin && <Route path="/sent" element={<Sent />}></Route>}
          {!isLoggin && <Route path="/signup" element={<SignUp />}></Route>}
          {!isLoggin && <Route path="/login" element={<Login />}></Route>}
          {isLoggin && <Route path="*" element={<Homepage />}></Route>}
          {!isLoggin && <Route path="*" element={<Login />}></Route>}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
