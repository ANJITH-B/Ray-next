import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");          
    setSocket(newSocket);

    axios.get("http://localhost:5000/api/v1/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Error fetching notifications:", err));

    newSocket.on("new_notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => newSocket.close();
  }, []);
  console.log('socket',socket);

  return (
    <SocketContext.Provider value={{ socket, notifications, setNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
