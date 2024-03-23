import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivetRoute from "./PrivetRoute";
import { routes } from "./routes";
import { v4 as uuid } from "uuid";
import PublicRoute from "./PublicRoute";
import MasterLayout from "../Layout/MasterLayout";
import AuthLayout from "../Layout/AuthLayout";

const IndexRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivetRoute />}>
        <Route element={<MasterLayout />}>
          {routes.map((item) => {
            if (item.IsPrivet) {
              if (item.isSubRoute) {
                return (
                  <Route
                    path={item?.path}
                    key={uuid()}
                    element={<item.component />}
                  >
                    {item.subRoute?.map((sub) => {
                      return (
                        <Route
                          path={sub?.path}
                          key={uuid()}
                          element={<sub.component />}
                        ></Route>
                      );
                    })}
                  </Route>
                );
              } else {
                return (
                  <Route
                    key={uuid()}
                    path={"/" + item?.path}
                    element={<item.component />}
                  />
                );
              }
            } else {
              return null;
            }
          })}
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          {routes?.map((item) => {
            if (!item?.IsPrivet) {
              if (item.subRoute) {
                return item.subRoute?.map((sub) => {
                  return (
                    <Route
                      path={item?.path}
                      key={uuid()}
                      element={<item.component />}
                    >
                      <Route
                        path={sub?.path}
                        key={uuid()}
                        element={<sub.component />}
                      ></Route>
                    </Route>
                  );
                });
              } else {
                return (
                  <Route
                    path={item?.path}
                    key={uuid()}
                    element={<item.component />}
                  ></Route>
                );
              }
            } else return null;
          })}
        </Route>
      </Route>
    </Routes>
  );
};

export default IndexRoutes;
