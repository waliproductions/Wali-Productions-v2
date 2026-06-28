import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/config/site";

const ROUTE_PRIORITIES: Record<string, number> = {
  "/": 1.0,
  "/services": 0.9,
  "/government": 0.9,
  "/contact": 0.85,
  "/portfolio": 0.8,
  "/about": 0.75,
};

const ROUTE_CHANGE_FREQUENCY: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  "/": "weekly",
  "/services": "monthly",
  "/government": "monthly",
  "/contact": "yearly",
  "/portfolio": "monthly",
  "/about": "yearly",
};

const ROUTES = ["/", "/about", "/services", "/government", "/portfolio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const lastModified = new Date();

  return ROUTES.map((path) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: ROUTE_CHANGE_FREQUENCY[path] ?? "monthly",
    priority: ROUTE_PRIORITIES[path] ?? 0.7,
  }));
}
