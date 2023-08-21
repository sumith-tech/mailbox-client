import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import { Button, Card, Table } from "react-bootstrap";
import SentList from "./SentList";
import SentMails from "../../Custom Hooks/sentmail";

const Sent = () => {
  const myemail = useSelector((state) => state.auth.email);
  const [sentMails, SetSentMails] = useState([]);
  const [showFulldetails, setshowFulldetails] = useState(false);
  let [changes, setChanges] = useState(false);
  const [to, setTo] = useState();
  const [subject, setSubject] = useState();
  const [message, setmessage] = useState();

  const [getSentbox] = SentMails(
    `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${myemail.replace(
      /[.@]/g,
      ""
    )}/sent.json`
  );

  useEffect(() => {
    let loadedSentBox = [];
    for (const key in getSentbox) {
      loadedSentBox.push({
        id: key,
        sentto: getSentbox[key].To,
        message: getSentbox[key].message,
        subject: getSentbox[key].subject,
      });
    }

    SetSentMails(loadedSentBox);
  }, [getSentbox]);

  const showFulldetailsHandler = (item) => {
    setshowFulldetails(true);
    setTo(item.to);
    setSubject(item.subject);
    setmessage(item.message);
  };

  const sentlist = sentMails.map((mail) => (
    <SentList
      key={mail.id}
      id={mail.id}
      to={mail.sentto}
      message={mail.message}
      subject={mail.subject}
      showdetails={showFulldetailsHandler}
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
              <th>To</th>
              <th>Subject</th>
              <th>Body</th>
              <th>Delete Mail</th>
            </tr>
          </thead>
          <tbody>{sentlist}</tbody>
        </Table>
      )}
      {sentlist.length === 0 && (
        <h3 style={{ textAlign: "center" }}>No Sent Message</h3>
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
        <Card style={{ width: "50rem", margin: "3em" }}>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">To:{to}</Card.Subtitle>
            <Card.Title>Subject:{subject}</Card.Title>

            <Card.Text>{message}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Fragment>
  );
};

export default Sent;
