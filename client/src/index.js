import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import UserProvider from "./Components/Context/User/UserProvider";

import Routers from "./Components/Routers";
import "tiny-ui/dist/styles/index.css";
import "./Styles/App.scss";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={() => <h1>Ocurrió un error en la página</h1>}
    >
      <QueryClientProvider client={client}>
        <UserProvider>
          <Routers />
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
