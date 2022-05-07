import React from 'react'
import { Alert } from 'react-bootstrap';
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
    <Alert style={style}>
      {notification.text}
    </Alert>
  )
}


export default Notification