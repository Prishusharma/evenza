interface MapProps {
  embedUrl: string;
}

export function Map({ embedUrl }: MapProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <iframe
        title="Google Map"
        src={embedUrl}
        className="w-full h-64 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}