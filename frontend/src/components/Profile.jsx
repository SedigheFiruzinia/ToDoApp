import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container, Card } from "react-bootstrap";
import { stateChanged } from "../reducers/taskReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((element) => element.Tasks);
  console.log(tasks);

  const onClick = (id) => {
    dispatch(stateChanged(id));
  };

  return (
    <Row style={{ marginRight: 0, marginLeft: 0 }}>
      <Row
        className="d-flex justify-content-center align-items-center pt-4"
        style={{
          // backgroundColor: "rgba(166, 166, 216, 0.07)",
          backgroundColor: "white",
          height: "100vh",
        }}
      >
        <Col
          xs={4}
          sm={2}
          className="mt-4 pb-3"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          {tasks.map((t) => (
            <Container className="d-flex justify-content-center" key={t.id}>
              <Card
                className=" rounded-0"
                onClick={() => onClick(t.id)}
                style={{ cursor: "pointer", width: "118px", height: "150px" }}
              >
                <Card.Body style={{ fontSize: "12px" }}>
                  <Card.Text
                    className="TextTruncation"
                    style={{ color: "rgba(5, 5, 5, 0.7)" }}
                  >
                    {t.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Container>
          ))}
        </Col>
      </Row>
    </Row>
  );
};

export default Profile;
