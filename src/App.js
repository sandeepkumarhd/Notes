import ErrorElement from "./Components/ErrorElement";
import Header from "./Components/Header";
import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Protected from "./Components/Protected";
import "./App.css";
import DetailsPage from "./pages/DetailsPage";
import AllUsers from "./pages/AllUser";
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
        element: <Protected Component={Home} />,
      },
      {
        path: "/details",
        element: <Protected Component={DetailsPage} />,
      },
      {
        path: "/users",
        element: <Protected Component={AllUsers} />,
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
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
