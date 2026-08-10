import { useCallback, useEffect, useMemo, useState } from "react";
import SiteSettingsContext from "./SiteSettingsContext";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export const SITE_ASSETS_BUCKET = "site-assets";

const defaultSettings = {
  site_logo: null,
  home_hero: null,
  nosotros_hero: null,
  servicios_hero: null,
  territorios_hero: null,
  proyectos_hero: null,
  transparencia_hero: null,
  contacto_hero: null,
  vinculate_hero: null,
};

function getPublicUrl(path) {
  if (!path || !supabase) return null;

  const { data } = supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function readSiteSettings() {
  if (!supabase) {
    return { available: false, settings: defaultSettings };
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) {
    return { available: false, settings: defaultSettings };
  }

  const nextSettings = { ...defaultSettings };
  data?.forEach((item) => {
    if (item.key in nextSettings) {
      nextSettings[item.key] = item.value;
    }
  });

  return { available: true, settings: nextSettings };
}

function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [available, setAvailable] = useState(false);

  const loadSettings = useCallback(async () => {
    const result = await readSiteSettings();
    setSettings(result.settings);
    setAvailable(result.available);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    readSiteSettings().then((result) => {
      if (!active) return;
      setSettings(result.settings);
      setAvailable(result.available);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      settings,
      assets: Object.fromEntries(
        Object.entries(settings).map(([key, value]) => [key, getPublicUrl(value)]),
      ),
      loading,
      available,
      refreshSettings: loadSettings,
    }),
    [settings, loading, available, loadSettings],
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export default SiteSettingsProvider;
