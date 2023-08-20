import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../Redux/auth";
const InboxList = (props) => {
  const [unread, setunread] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${mymail.replace(
          /[.@]/g,
          ""
        )}/inbox/${props.id}.json`,
        {
          method: "Delete",
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      } else {
        alert("Deleted SuccessFully");
        dispatch(authAction.delete(props.id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <tr style={{ textAlign: "center", cursor: "pointer" }}>
      <td onClick={onclickHandler}>
        {unread == 1 && (
          <span>
            <Button />
          </span>
        )}
      </td>
      <td onClick={onclickHandler}>{props.from}</td>
      <td onClick={onclickHandler}>{props.subject}</td>
      <td onClick={onclickHandler}>{props.message}</td>
      <td>
        <Button onClick={deleteHandler} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default InboxList;
