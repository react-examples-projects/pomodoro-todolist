import { lazy } from "react";
import {
  privateRoute,
  redirectRoute,
  route,
} from "../Components/Helpers/utils";

const Home = lazy(() => import("../Components/Pages/Home"));
const Login = lazy(() => import("../Components/Pages/Login"));
const Signup = lazy(() => import("../Components/Pages/Register"));
const Dashboard = lazy(() => import("../Components/Pages/Dashboard"));
const Import = lazy(() => import("../Components/Pages/Import"));
const Importants = lazy(() => import("../Components/Pages/Importants"));
const Secondaries = lazy(() => import("../Components/Pages/Secondaries"));
const NotFound = lazy(() => import("../Components/Pages/404"));

const routers = [
  redirectRoute(Login, "/login"),
  redirectRoute(Signup, "/signup"),
  privateRoute(Dashboard, "/dashboard"),
  privateRoute(Import, "/import"),
  privateRoute(Importants, "/importants"),
  privateRoute(Secondaries, "/secondaries"),
  route(Home, "/"),
  route(NotFound),
];

export default routers;
