import React from "react";
import { Card } from "react-bootstrap";

const InboxMessage = (props) => {
  return (
    <Card style={{ width: "50rem", margin: "3em" }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          From:{props.from}
        </Card.Subtitle>
        <Card.Title>Subject:{props.subject}</Card.Title>

        <Card.Text>{props.message}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default InboxMessage;
