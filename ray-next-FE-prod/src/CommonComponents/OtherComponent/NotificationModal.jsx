import React from "react";
import { useSocket } from "../../Context/SocketContext";

const NotificationModal = ({ isOpen, onClose }) => {
  const { notifications } = useSocket() || {};
  console.log('notifications',notifications);

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-5 bg-white shadow-lg p-4 w-80 rounded-lg">
      <h3 className="font-bold text-lg border-b pb-2">Notifications</h3>
      <ul className="mt-2">
        {notifications.length === 0 ? (
          <li className="text-gray-500 text-sm">No new notifications</li>
        ) : (
          notifications.map((notif, index) => (
            <li key={index} className="text-sm py-1 border-b">
              {notif.message}
            </li>
          ))
        )}
      </ul>
      <button onClick={onClose} className="w-full mt-3 py-1 bg-gray-200 rounded">Close</button>
    </div>
  );
};

export default NotificationModal;
