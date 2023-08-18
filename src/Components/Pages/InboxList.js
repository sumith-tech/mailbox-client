import React from "react";

const InboxList = (props) => {
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{props.subject}</td>
      <td>{props.from}</td>
      <td>me</td>
    </tr>
  );
};
export default InboxList;
