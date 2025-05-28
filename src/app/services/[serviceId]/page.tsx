import Service from "@/pages/Service";

export default function ServicePage({
  params,
}: {
  params: { serviceId: string };
}) {
  return <Service serviceId={params.serviceId} />;
} 