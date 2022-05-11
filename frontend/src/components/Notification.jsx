import React from 'react'
import { Toast } from 'react-bootstrap';
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((element) => element.Notification);
  const style = {
    fontSize: 10,
    // borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 0
  }

  if (!notification) {
    return null
  }

  return (
    <Toast style={style}>
      <Toast.Header>
        <strong className="me-auto"> Message </strong>
      </Toast.Header>
      <Toast.Body>{notification.text}</Toast.Body>
    </Toast>
  )
}


export default Notification