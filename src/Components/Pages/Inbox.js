import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import InboxList from "./InboxList";
import { Button, Card } from "react-bootstrap";
import { authAction } from "../../Redux/auth";
const Inbox = () => {
  const myemail = useSelector((state) => state.auth.email);
  const [inboxmail, setInboxmail] = useState([]);
  const [showFulldetails, setshowFulldetails] = useState(false);


  const dispatch = useDispatch();

  const [from, setfrom] = useState();
  const [subject, setSubject] = useState();
  const [message, setmessage] = useState();
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
          from: data[key].from,
          message: data[key].message,
          subject: data[key].subject,
          unread: data[key].unread,
        });
      }
      setInboxmail(loadedinboxBox);
      dispatch(authAction.addinbox(loadedinboxBox));
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    getInbox();
  }, []);

  

  const showFulldetailsHandler = (item) => {
    setshowFulldetails(true);
    setfrom(item.from);
    setSubject(item.subject);
    setmessage(item.message);
  };
  const inboxlist = inboxmail.map((mail) => (
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
        <table className="email-list table table-striped table-condensed">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th></th>
              <th>From</th>
              <th>Subject</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{inboxlist}</tbody>
        </table>
      )}{" "}
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
        <Card style={{ width: "50rem", margin: "3em" }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">
              From:{from}
            </Card.Subtitle>
            <Card.Title>Subject:{subject}</Card.Title>

            <Card.Text>{message}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Fragment>
  );
};

export default Inbox;
