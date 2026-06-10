import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function usePublishedDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    async function loadDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("id, title, description, category, file_path, updated_at")
        .eq("is_published", true)
        .order("updated_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.error("No fue posible cargar los documentos publicados.", error);
        setDocuments([]);
      } else {
        setDocuments(data ?? []);
      }

      setLoading(false);
    }

    loadDocuments();

    return () => {
      active = false;
    };
  }, []);

  return { documents, loading, configured: isSupabaseConfigured };
}

export default usePublishedDocuments;
