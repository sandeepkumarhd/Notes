import ErrorElement from "./Components/ErrorElement";
import Header from "./Components/Header";
import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
const Kav = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const routes = [
  {
    path: "/",
    element: <Kav />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      { path: "*", element: <Page404 /> },
    ],
  },
];
// Create the router using createBrowserRouter
const router = createBrowserRouter(routes);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
