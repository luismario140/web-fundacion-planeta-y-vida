import { useEffect, useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return undefined;

    let active = true;

    const syncSession = async (nextSession) => {
      if (!active) return;
      setSession(nextSession);

      if (!nextSession?.user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", nextSession.user.id)
        .maybeSingle();

      if (!active) return;
      setIsAdmin(Boolean(data));
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => syncSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true);
      syncSession(nextSession);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      isAdmin,
      loading,
      configured: isSupabaseConfigured,
    }),
    [session, isAdmin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
