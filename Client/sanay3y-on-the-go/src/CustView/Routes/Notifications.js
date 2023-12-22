import React from 'react'
import "../styles/notification.css"

const Notifications = ({notifications}) => {
  return (
    <div className="notification-container">
    {notifications.map((notification, index) => (
      <div key={index} className="notification">
        <div className="order-header">{notification.order_header}</div>
        <div className="content">{notification.content}</div>
        <div className="timestamp">{notification.timestamp}</div>
      </div>
    ))}
  </div>
  )
}

export default Notifications
