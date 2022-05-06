import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card } from "react-bootstrap";
import { stateChanged } from "../reducers/taskReducer";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((element) => element.Tasks);

  const onClick = (id) => {
    dispatch(stateChanged(id));
  };

  return (
    <>
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
    </>
  );
};

export default Tasks;
