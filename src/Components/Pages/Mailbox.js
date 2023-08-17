import React, { useRef, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
const Mailbox = () => {
  const subjectRef = useRef();
  const emailref = useRef();
  const messageRef = useRef();

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const addDetails = async (event) => {
    event.preventDefault();
    const entredEmail = emailref.current.value;
    const entredsubject = subjectRef.current.value;
    const entredMessage = messageRef.current.value;

    const data = {
      email: entredEmail,
      subject: entredsubject,
      message: entredMessage,
    };
    try {
      const response = await fetch(
        "https://expense-tracker-414ae-default-rtdb.firebaseio.com/inbox.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
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
                    ref={emailref}
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
                    ref={subjectRef}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group col-md-12 editor">
                  <label className="font-weight-bold">
                    {" "}
                    Description <span className="required"> * </span>{" "}
                  </label>
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <input
                    type="text"
                    style={{ display: "none" }}
                    ref={messageRef}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  />
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
    </>
  );
};
export default Mailbox;
