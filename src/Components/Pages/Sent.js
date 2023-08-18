import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import { Table } from "react-bootstrap";
import SentList from "./SentList";

const Sent = () => {
  const myemail = useSelector((state) => state.auth.email);
  const [sentMails, SetSentMails] = useState([]);

  const getSentbox = async () => {
    try {
      const response = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${myemail.replace(
          /[.@]/g,
          ""
        )}/sent.json`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();

      const loadedSentBox = [];
      for (const key in data) {
        loadedSentBox.push({
          id: key,
          sentto: data[key].To,
          message: data[key].message,
          subject: data[key].subject,
        });
      }
      SetSentMails(loadedSentBox);
      console.log(loadedSentBox);
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    getSentbox();
  }, []);

  const sentlist = sentMails.map((mail) => (
    <SentList
      key={mail.id}
      to={mail.sentto}
      message={mail.message}
      subject={mail.subject}
    />
  ));

  return (
    <Fragment>
      <MainNavbar />
      <table className="email-list table table-striped table-condensed">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Subject</th>
            <th>To</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>{sentlist}</tbody>
      </table>
    </Fragment>
  );
};

export default Sent;
