import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

const SentList = (props) => {
  
  const onclickHandler = () => {
    props.showdetails(props);
  };
  return (
    <Fragment>
    <tr
      onClick={onclickHandler}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      <td>{props.to}</td>
      <td>{props.subject}</td>
      <td>{props.message}</td>
    </tr>
    </Fragment>
  );
};
export default SentList;
