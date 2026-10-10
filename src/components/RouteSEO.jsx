import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import { seo } from "../../src/data/SEOData";

export default function RouteSEO() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname; // trailing slash hatao
  const data = seo[path] || seo["/"];
  return <SEO {...data} path={path} />;
}