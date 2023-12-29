import React from 'react'

const Notifications = ({notifications}) => {
  return (
    <div>
      <div className="notification-container">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          <div className="order-header">Order #{notification.order_id}</div>
          <div className="content">{notification.content}</div>
          <div className="timestamp">{notification.notification_date}</div>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Notifications
