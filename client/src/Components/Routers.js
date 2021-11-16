import { Switch, BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./Elements/Routers/PrivateRoute";
import RedirectRoute from "./Elements/Routers/RedirectRoute";
import PublicRoute from "./Elements/Routers/PublicRoute";
import routers from "../Config/routers";
import CountDown from "./Elements/Components/CountDown";
import { useEffect } from "react";
import { setThemeOnload } from "./Helpers/utils";

export default function Routers() {
  useEffect(() => {
    setThemeOnload();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          {routers.map((route, i) => {
            const key = route.path || i;
            if (route.private) return <PrivateRoute {...route} key={key} />;
            if (route.redirect) return <RedirectRoute {...route} key={key} />;
            if (route.public) return <PublicRoute {...route} key={key} />;
            return <Route {...route} key={key} />;
          })}
        </Switch>
      </BrowserRouter>

      <CountDown />
    </>
  );
}
