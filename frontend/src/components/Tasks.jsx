import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, ListGroup } from "react-bootstrap";
import { stateChanged } from "../reducers/taskReducer";
import pending from "./Images/oval (1).png";
import done from "./Images/tick (1).png";
import { setNotification } from "../reducers/notificationReducer";


const Tasks = ({ test }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((element) => element.Tasks);

  const onClick = async (task) => {
    dispatch(stateChanged(task));
    dispatch(setNotification(`Task "${task.text}" is ${task.state===true ? "pending" : "done :)"}`))
  };

  return (
    <Container>
      <ListGroup variant="flush">
        {tasks.map((t) => (
          <ListGroup.Item action onClick={ test===undefined ? () => onClick(t) : test } key={t.id}>
            {t.state ? (
              <img
                src={done}
                width="20"
                height="20"
                alt=""
                style={{ marginRight: 30 }}
              />
            ) : (
              <img
                src={pending}
                width="0"
                height="0"
                alt=""
                style={{ marginRight: 50 }}
              />
            )}
            {t.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Tasks;
