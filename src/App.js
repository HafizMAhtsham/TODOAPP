import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import API from "./components/api"

function App() {
  const [api, setapi] = useState([]);
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => {
      const todos = response.data;
      setapi(todos);
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
    });
  return (
    <Router>
      <Routes>
        <Route
          path=""
          element={
            <>
                        <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="/">Todo Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/api">API Data</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            
            <div className="todo-app">
              <TodoList />
            </div>
            </>
          }
        />
        <Route
          path="api"
          element={<API/>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
