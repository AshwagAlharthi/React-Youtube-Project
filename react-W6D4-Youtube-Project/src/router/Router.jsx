import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import "../index.css";
import App from "../App.jsx"
import VideoPage from "../pages/VideoPage.jsx";
import Announcement from "../components/Announcement.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Search from "../pages/Search.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/search/:searchValue",
    element: <Search />
  },
  {
    path: "/video/:categoryId/:id",
    element: <VideoPage />
  },
  {
    path: "/announcement",
    element: <Announcement />
  },
]);

export default router