import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import "../../styles/admin.css";

function AdminLogin() {
  const { user, isAdmin, loading, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    return <Navigate to="/admin/documentos" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!configured) {
      setError(
        "Supabase aún no está configurado. Completa las variables de entorno.",
      );
      return;
    }

    setSubmitting(true);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setSubmitting(false);
      setError("No fue posible iniciar sesión. Revisa tus credenciales.");
      return;
    }

    const { data: authorization } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (!authorization) {
      await supabase.auth.signOut();
      setSubmitting(false);
      setError("Esta cuenta no tiene autorización administrativa.");
      return;
    }

    setSubmitting(false);
    navigate(location.state?.from || "/admin/documentos", { replace: true });
  };

  return (
    <section className="admin-page admin-page--login">
      <div className="admin-login-card">
        <span className="admin-login-card__icon">
          <FaLock aria-hidden="true" />
        </span>
        <span className="eyebrow">Acceso privado</span>
        <h1>Administración documental</h1>
        <p>
          Área exclusiva para la persona responsable de publicar documentos
          institucionales.
        </p>
        {location.state?.unauthorized && (
          <p className="admin-message admin-message--error">
            La cuenta activa no tiene autorización administrativa.
          </p>
        )}

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Correo electrónico
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="admin-message admin-message--error">{error}</p>}

          <button className="button button--primary" disabled={submitting}>
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
