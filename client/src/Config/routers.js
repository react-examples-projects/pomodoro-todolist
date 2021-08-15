import { lazy } from "react";
import { privateRoute, redirectRoute } from "../Components/Helpers/utils";

const Login = lazy(() => import("../Components/Pages/Login"));
const Signup = lazy(() => import("../Components/Pages/Register"));
const Dashboard = lazy(() => import("../Components/Pages/Dashboard"));

const routers = [
  redirectRoute(Login, "/login"),
  redirectRoute(Signup, "/signup"),
  privateRoute(Dashboard, "/dashboard"),
];

export default routers;
