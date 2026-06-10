import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, isAdmin, loading, configured } = useAuth();
  const location = useLocation();

  if (!configured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return <div className="admin-loading">Verificando acceso seguro...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ unauthorized: true }} />;
  }

  return children;
}

export default ProtectedRoute;
