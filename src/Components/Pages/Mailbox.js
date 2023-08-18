import React, { Fragment, useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "react-bootstrap";
import MainNavbar from "../Layouts/Navbar";
import { useSelector } from "react-redux";
const Mailbox = () => {
  const [sendTo, setSendto] = useState();
  const [subject, setSubject] = useState();

  const myemail = useSelector((state) => state.auth.email);

  const [message, setMessage] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setMessage(editorState);
  };

  const addDetails = async (event) => {
    event.preventDefault();
    const content = convertToRaw(message.getCurrentContent());
    const body = JSON.stringify(content.blocks[0].text);
    console.log(body);
    const sent = {
      To: sendTo,
      subject: subject,
      message: body,
    };
    const inbox = {
      from: myemail,
      subject: subject,
      message: body,
      unread: 1,
    };

    try {
      const sentResponse = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${myemail.replace(
          /[.@]/g,
          ""
        )}/sent.json`,
        {
          method: "POST",
          body: JSON.stringify(sent),
        }
      );
      const Inboxresponse = await fetch(
        `https://mailboxclient-6fa3f-default-rtdb.firebaseio.com/${sendTo.replace(
          /[.@]/g,
          ""
        )}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(inbox),
        }
      );
      if (!sentResponse.ok && !Inboxresponse.ok) {
        throw new Error("Something went wrong");
      } else {
        alert("E-mail sent successfully");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <Fragment>
      <MainNavbar />
      <div className="App">
        <div className="container">
          <div className="row">
            <form onSubmit={addDetails} className="update__forms">
              <h3 className="myaccount-content"> E-Mail </h3>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label className="font-weight-bold"> To:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setSendto(e.target.value)}
                    className="form-control"
                    placeholder="email"
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="font-weight-bold"> Subject:</label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Body: <span className="required"> * </span>{" "}
                  </label>
                  <Editor
                    editorState={message}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  {/* <input
                    type="text"
                    style={{ display: "none" }}
                    ref={messageRef}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  /> */}
                </div>

                <div className="form-group col-sm-12 text-right">
                  <Button type="submit" variant="success">
                    {" "}
                    Send{" "}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Mailbox;
