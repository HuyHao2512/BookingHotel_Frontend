import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import LayoutUser from "../src/layouts/LayoutUser/LayoutUser";
import LayoutAdmin from "../src/layouts/LayoutAdmin/LayoutAdmin";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          let Layout;

          if (route.isShowHeader) {
            Layout = LayoutUser;
          } else if (route.isAdmin) {
            Layout = LayoutAdmin;
          } else {
            Layout = React.Fragment;
          }

          if (route.children) {
            return (
              <Route key={route.path} path={route.path} element={<Page />}>
                {route.children.map((childRoute) => {
                  const ChildPage = childRoute.page;
                  return (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={<ChildPage />}
                    />
                  );
                })}
              </Route>
            );
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
