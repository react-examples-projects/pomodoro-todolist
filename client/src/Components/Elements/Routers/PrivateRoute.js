import { Route, Redirect } from "react-router-dom";
import { existsToken } from "../../Helpers/token";
import LoaderPage from "../Loaders/LoaderPage";
import useCurrentUser from "../../Hooks/User/useCurrentUser";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useCurrentUser();
  if (isLoading) return <LoaderPage />;
  return (
    <Route {...rest}>
      {(props) =>
        existsToken() && user ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
}
