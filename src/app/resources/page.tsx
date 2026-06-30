import { buildMetadata } from "@/lib/seo";
import { ResourcesPage } from "@/components/resources/ResourcesPage";

export const metadata = buildMetadata({
  title: "Resources & Insights",
  description:
    "Technology buyer education from Wali Productions LLC — guides on IT consulting, government contracting, cybersecurity, AI integration, cloud migration, and digital transformation. Serving Springfield, Missouri and clients nationwide.",
  path: "/resources",
});

export default function Resources() {
  return <ResourcesPage />;
}
