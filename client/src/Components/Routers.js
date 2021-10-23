import { Switch, BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./Elements/Routers/PrivateRoute";
import RedirectRoute from "./Elements/Routers/RedirectRoute";
import PublicRoute from "./Elements/Routers/PublicRoute";
import routers from "../Config/routers";
import usePomodoro from "./Hooks/Context/usePomodoro";
import { Card, Button, Countdown, Divider } from "tiny-ui";

export default function Routers() {
  const { currentTask, stopTask } = usePomodoro();
  const seconds = currentTask?.minutes * currentTask?.pomodoros * 60;
  const deadline = new Date(Date.now() + 1000 * 60 * 60 * 0 + 1000 * seconds);

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
      {currentTask && (
        <div className="currentTask">
          <Card
            active
            title={currentTask.title}
            extra={
              <Button size="sm" btnType="ghost" onClick={stopTask}>
                Finalizar
              </Button>
            }
          >
            <Card.Content>
              {currentTask.content}
              <Divider />
              <Countdown
                millisec
                value={deadline}
                onFinish={() => console.log("done")}
              >
                {(val) => (
                  <div className="mt-1">
                    <span className="me-1">{val.hour}h</span>
                    <span className="me-1">{val.min}min</span>
                    <span className="me-1">{val.sec}s</span>
                  </div>
                )}
              </Countdown>
            </Card.Content>
          </Card>
        </div>
      )}
    </>
  );
}
