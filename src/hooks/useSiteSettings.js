import { useContext } from "react";
import SiteSettingsContext from "../context/SiteSettingsContext";

function useSiteSettings() {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    throw new Error("useSiteSettings debe utilizarse dentro de SiteSettingsProvider.");
  }

  return context;
}

export default useSiteSettings;
