import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { servicesContent } from "@/config/services";
import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesContent.categories.flatMap((category) =>
    category.services
      .filter((service) => service.id)
      .map((service) => ({ slug: service.id as string }))
  );
}

function findService(slug: string) {
  for (const category of servicesContent.categories) {
    const service = category.services.find((s) => s.id === slug);
    if (service) return { service, categoryTitle: category.title };
  }
  return null;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) return {};

  const { service } = found;
  return buildMetadata({
    title: service.title,
    description: `${service.title} from Wali Productions LLC — Veteran-Owned technology consulting. ${service.description} Serving government agencies, nonprofits, churches, and businesses nationwide from Springfield, Missouri.`,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) notFound();

  return (
    <ServiceLandingPage
      service={found.service}
      categoryTitle={found.categoryTitle}
    />
  );
}
