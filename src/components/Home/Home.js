import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import apiClient from "../../coreServices/apiClient";
import { setUser } from "../Login/services/redux/loggedInUserActions";
import "./Home.css";

const Home = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const dispatch = useDispatch();
  let history = useHistory();

  console.log(loggedInUser);

  const logout = () => {
    apiClient.post("/logout").then((response) => {
      if (response.status === 204) {
        dispatch(setUser(null));
        sessionStorage.setItem("loggedInUser", null);
        history.push("/");
      }
    });
  };

  return (
    <Container fluid>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">RondhonShilpi</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {loggedInUser ? (
              <Nav.Link onClick={logout}>LogOut</Nav.Link>
            ) : (
              <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h3>This is homepage</h3>
      {loggedInUser ? <h1>Welcome {loggedInUser.name}</h1> : null}
    </Container>
  );
};

export default Home;
