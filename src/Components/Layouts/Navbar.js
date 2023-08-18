import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../Redux/auth";
const MainNavbar = () => {
  const navigate = useNavigate();
  const isLoggin = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const LogoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
     
      >
        <Container>
          <Navbar.Brand href="/mailbox">MailBox</Navbar.Brand>
          <Nav className="me-auto">
            {isLoggin && <Nav.Link href="/">Home</Nav.Link>}
            {!isLoggin && <Nav.Link href="/login">Login</Nav.Link>}
            {!isLoggin && <Nav.Link href="/signup">SignUp</Nav.Link>}
            {isLoggin && <Nav.Link href="/">Inbox</Nav.Link>}
            {isLoggin && <Nav.Link href="/">Sent</Nav.Link>}
          </Nav>
        </Container>
        {isLoggin && (
          <Button
            variant="danger"
            style={{ marginRight: "2em" }}
            onClick={LogoutHandler}
          >
            Logout
          </Button>
        )}
      </Navbar>
    </div>
  );
};
export default MainNavbar;
