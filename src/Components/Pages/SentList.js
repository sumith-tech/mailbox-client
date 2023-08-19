import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authAction } from "../../Redux/auth";

const SentList = (props) => {
  const mymail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const onclickHandler = () => {
    props.showdetails(props);
  };
  const deleteHandler = async () => {
    console.log(props.id)
    try {
      const response = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${mymail.replace(
          /[.@]/g,
          ""
        )}/sent/${props.id}.json`,
        {
          method: "Delete",
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      } else {
        alert("Deleted SuccessFully");
        
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Fragment>
      <tr
        
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <td onClick={onclickHandler}>{props.to}</td>
        <td onClick={onclickHandler}>{props.subject}</td>
        <td onClick={onclickHandler}>{props.message}</td>
        <td>
          <Button onClick={deleteHandler} variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    </Fragment>
  );
};
export default SentList;
