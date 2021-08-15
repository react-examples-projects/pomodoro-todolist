import { lazy } from "react";
import { route } from "../Components/Helpers/utils";

const Login = lazy(() => import("../Components/Pages/Login"));
const Signup = lazy(() => import("../Components/Pages/Register"));
const Dashboard = lazy(() => import("../Components/Pages/Dashboard"));

const routers = [
  route(Login, "/login"),
  route(Signup, "/signup"),
  route(Dashboard, "/dashboard"),
];

export default routers;
