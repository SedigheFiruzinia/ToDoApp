import React from "react";
import { Col, Row } from "react-bootstrap";
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
      <Col md={{ offset: 4 , span: 3 }} ><Notification /></Col>
    </Row>
  );
};

export default Profile;
