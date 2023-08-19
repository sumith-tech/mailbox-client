import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainNavbar from "../Layouts/Navbar";
import { Button, Card, Table } from "react-bootstrap";
import SentList from "./SentList";

const Sent = () => {
  const myemail = useSelector((state) => state.auth.email);
  const [sentMails, SetSentMails] = useState([]);
  const [showFulldetails, setshowFulldetails] = useState(false);

  const [to, setTo] = useState();
  const [subject, setSubject] = useState();
  const [message, setmessage] = useState();

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
