import { serializeJsonLd } from "@/lib/structured-data";

type JsonLdObject = Record<string, unknown>;

type StructuredDataProps = {
  data: JsonLdObject | Array<JsonLdObject | null | undefined> | null | undefined;
};

export function StructuredData({ data }: StructuredDataProps) {
  const entries = (Array.isArray(data) ? data : [data]).filter((entry): entry is JsonLdObject => Boolean(entry));
  if (!entries.length) return null;

  return (
    <>
      {entries.map((entry, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(entry) }} />
      ))}
    </>
  );
}
