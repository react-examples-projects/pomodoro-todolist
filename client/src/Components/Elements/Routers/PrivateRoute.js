import { Route, Redirect } from "react-router-dom";
import { existsToken } from "../../Helpers/token";
import LoaderPage from "../Loaders/LoaderPage";
import useUserInfo from "../../Hooks/User/useUserInfo";
import PropTypes from "prop-types";
function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useUserInfo();
  if (isLoading) return <LoaderPage />;
  return (
    <Route {...rest}>
      {(props) =>
        existsToken() && user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    </Route>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRoute;
