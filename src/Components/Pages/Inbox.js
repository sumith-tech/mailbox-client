import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import InboxList from "./InboxList";
import { Button, Card, Table } from "react-bootstrap";
import { authAction } from "../../Redux/auth";
import { useNavigate } from "react-router-dom";
import InboxMessage from "./InboxMessage";
const Inbox = () => {
  const inbox = useSelector((state) => state.auth.inbox);
  const [inboxmail, setInboxmail] = useState([]);
  const [showFulldetails, setshowFulldetails] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate;

  const [from, setfrom] = useState();
  const [subject, setSubject] = useState();
  const [message, setmessage] = useState();
  // const getInbox = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${myemail.replace(
  //         /[.@]/g,
  //         ""
  //       )}/inbox.json`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("something went wrong");
  //     }
  //     const data = await response.json();

  //     const loadedinboxBox = [];
  //     for (const key in data) {
  //       loadedinboxBox.push({
  //         id: key,
  //         from: data[key].from,
  //         message: data[key].message,
  //         subject: data[key].subject,
  //         unread: data[key].unread,
  //       });
  //     }
  //     setInboxmail(loadedinboxBox);
  //     dispatch(authAction.addinbox(loadedinboxBox));
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  // useEffect(() => {
  //   getInbox();
  // }, []);
  

  const showFulldetailsHandler = (item) => {
    setshowFulldetails(true);
    setfrom(item.from);
    setSubject(item.subject);
    setmessage(item.message);
  };
  console.log(inbox);
  const inboxlist = inbox.map((mail) => (
    <InboxList
      key={mail.id}
      id={mail.id}
      from={mail.from}
      message={mail.message}
      subject={mail.subject}
      showdetails={showFulldetailsHandler}
      unread={mail.unread}
    />
  ));
  return (
    <Fragment>
      <MainNavbar />
      {!showFulldetails && (
        <Table
          striped
          bordered
          hover
          variant="dark"
          style={{ marginTop: "3em" }}
        >
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th></th>
              <th>From</th>
              <th>Subject</th>
              <th>Body</th>
              <th>Delete Mail</th>
            </tr>
          </thead>
          {inboxlist.length > 0 && <tbody>{inboxlist}</tbody>}
        </Table>
      )}{" "}
      {inboxlist.length === 0 && (
        <h3 style={{ textAlign: "center" }}>No new Message</h3>
      )}
      {showFulldetails && (
        <Button
          onClick={() => {
            setshowFulldetails(false);
          }}
          variant="success"
          style={{ margin: "1.5em" }}
        >
          <span className="bi bi-arrow-return-left"></span>Back
        </Button>
      )}
      {showFulldetails && (
        <InboxMessage from={from} subject={subject} message={message} />
      )}
    </Fragment>
  );
};

export default Inbox;
