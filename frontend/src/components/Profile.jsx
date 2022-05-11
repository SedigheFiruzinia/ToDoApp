import React from "react";
import { Row } from "react-bootstrap";
import Tasks from "./Tasks";
import Navbar from "./Navbar";
import Notification from "./Notification";

const Profile = () => {
  return (
    <Row style={{ marginRight: 0, marginLeft: 0 }}>
      <Navbar />
      <Row className="d-flex justify-content-center align-items-center pt-4 px-5">
        <Tasks />
      </Row>
      <Row className="d-flex justify-content-end align-items-end pt-5 mt-5">
        <Notification />
      </Row>
    </Row>
  );
};

export default Profile;
