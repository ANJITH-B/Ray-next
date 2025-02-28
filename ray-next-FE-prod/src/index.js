import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SocketProvider } from "./Context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <SocketProvider>
      <App />
    </SocketProvider>
    </QueryClientProvider>
  </Provider>
);
