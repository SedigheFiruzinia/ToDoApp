import React from "react";
import { Row } from "react-bootstrap";
import Tasks from "./Tasks";
import Navbar from "./Navbar";

const Profile = () => {
  return (
    <Row style={{ marginRight: 0, marginLeft: 0 }}>
      <Navbar />
      <Row className="d-flex justify-content-center align-items-center pt-4 px-5">
        <Tasks />
      </Row>
    </Row>
  );
};

export default Profile;
