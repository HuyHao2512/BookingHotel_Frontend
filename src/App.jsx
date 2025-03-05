import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { routes } from "./routes";
import LayoutUser from "../src/layouts/LayoutUser/LayoutUser";
import LayoutAdmin from "../src/layouts/LayoutAdmin/LayoutAdmin";
import LoadingScreen from "./components/Home/LoadingScreen";
function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <LoadingWrapper setLoading={setLoading} />
      {loading && <LoadingScreen />}
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
    </>
  );
}
function LoadingWrapper({ setLoading }) {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Giả lập tải trang
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
export default App;
