import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import LoaderPage from "../Loaders/LoaderPage";
import useUserInfo from "../../Hooks/User/useUserInfo";

function PublicRoute(props) {
  const { isLoading } = useUserInfo();
  if (isLoading) return <LoaderPage />;
  return <Route {...props} />;
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

export default PublicRoute;
