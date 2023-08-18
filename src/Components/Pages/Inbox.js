import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import InboxList from "./InboxList";
const Inbox = () => {
  const myemail = useSelector((state) => state.auth.email);
  const [inboxmail, setInboxmail] = useState([]);
  const getInbox = async () => {
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
          inboxto: data[key].To,
          message: data[key].message,
          subject: data[key].subject,
        });
      }
      setInboxmail(loadedinboxBox)
      
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    getInbox();
  }, []);
  const inboxlist = inboxmail.map((mail) => (
    <InboxList
      key={mail.id}
      from={mail.inboxto}
      message={mail.message}
      subject={mail.subject}
    />
  ));

  return(
    <Fragment>
    <MainNavbar />
    <table className="email-list table table-striped table-condensed">
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th>Subject</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>{inboxlist}</tbody>
    </table>
  </Fragment>
  )
};

export default Inbox;
