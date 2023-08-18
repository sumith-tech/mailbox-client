import React from "react";

const SentList = (props) => {
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{props.subject}</td>
      <td>{props.to}</td>
      <td>Me</td>
    
    </tr>
  );
};
export default SentList;
