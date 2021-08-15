import { Route, Redirect } from "react-router-dom";
import { existsToken } from "../../Helpers/token";
import LoaderPage from "../Loaders/LoaderPage";
import useCurrentUser from "../../Hooks/User/useCurrentUser";

export default function RedirectRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) return <LoaderPage />;

  return (
    <Route
      {...rest}
      render={(props) =>
        existsToken() && user ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
