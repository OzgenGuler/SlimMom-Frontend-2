import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {

  const isAuth = useSelector((state) => Boolean(state.auth.token));

  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};


export default ProtectedRoute;


