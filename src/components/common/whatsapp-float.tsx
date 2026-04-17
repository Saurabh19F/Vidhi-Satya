import { MessageCircle } from "lucide-react";

type WhatsappFloatProps = {
  phone?: string;
};

export function WhatsappFloat({ phone }: WhatsappFloatProps) {
  if (!phone) return null;
  const sanitized = phone.replace(/[^\d]/g, "");
  return (
    <div className="group fixed bottom-24 right-4 z-40 md:bottom-6 md:right-6">
      <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#1f2937]/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg opacity-0 translate-x-2 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
        Talk to us
      </span>
      <a
        href={`https://wa.me/${sanitized}`}
        target="_blank"
        rel="noreferrer"
        className="india-tricolor-fab inline-flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-105"
        aria-label="Talk to us on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
