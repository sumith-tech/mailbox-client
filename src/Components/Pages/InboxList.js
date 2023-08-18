import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const InboxList = (props) => {
  const [unread, setunread] = useState("");

  const mymail = useSelector((state) => state.auth.email);

  useEffect(() => {
    setunread(props.unread);

  }, []);

  const onclickHandler = async () => {
    props.showdetails(props);
    setunread(null);

    const inbox = {
      from: props.from,
      subject: props.subject,
      message: props.message,
      unread: 0,
    };
    if (unread == 1) {
      console.log(1);
      const response = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${mymail.replace(
          /[.@]/g,
          ""
        )}/inbox/${props.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(inbox),
        }
      );
    }
  };

  return (
    <tr
      onClick={onclickHandler}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      <td>{unread==1 &&<span><Button/></span>}</td>
      <td>{props.from}</td>
      <td>{props.subject}</td>
      <td>{props.message}</td>
    </tr>
  );
};
export default InboxList;
