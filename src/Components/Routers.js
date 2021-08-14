import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function Routers() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}
