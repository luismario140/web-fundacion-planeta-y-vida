import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const { user, isAdmin, loading, configured } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!configured || !supabase) return undefined;

    const verifyActiveSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login", { replace: true });
      }
    };

    window.addEventListener("pageshow", verifyActiveSession);
    window.addEventListener("focus", verifyActiveSession);

    return () => {
      window.removeEventListener("pageshow", verifyActiveSession);
      window.removeEventListener("focus", verifyActiveSession);
    };
  }, [configured, navigate]);

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
