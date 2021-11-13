import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import UserProvider from "./Components/Context/User/UserProvider";
import PomodoroProvider from "./Components/Context/Pomodoro/PomodoroProvider";
import client from "./Config/reactQuery";

import Routers from "./Components/Routers";
import "tiny-ui/dist/styles/index.css";
import "./Styles/App.scss";
import "./Styles/utils.scss";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={() => <h1>Ocurrió un error en la página</h1>}
    >
      <QueryClientProvider client={client}>
        <UserProvider>
          <PomodoroProvider>
            <Routers />
          </PomodoroProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
