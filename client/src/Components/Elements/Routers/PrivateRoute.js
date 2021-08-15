import { Route, Redirect } from "react-router-dom";
import { existsToken } from "../../Helpers/token";
import LoaderPage from "../Loaders/LoaderPage";
import useUserInfo from "../../Hooks/User/useUserInfo";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useUserInfo();
  if (isLoading) return <LoaderPage />;
  return (
    <Route {...rest}>
      {(props) =>
        existsToken() && user ? <Component {...props} /> : <Redirect to="/login" />
      }
    </Route>
  );
}
