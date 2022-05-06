import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import { tasksInitialized } from "./reducers/taskReducer";
import { Container } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksInitialized());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid="xs" className="pl-0">
      <Router>
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
