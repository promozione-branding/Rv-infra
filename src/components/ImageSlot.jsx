import Icon from "./Icon";

// Shows a real photo if `src` is set, otherwise a styled placeholder.
export default function ImageSlot({ src, alt = "", icon = "Construction", className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-800 to-navy ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(246,178,27,.35),transparent_55%)]" />
          <Icon name={icon} className="absolute left-1/2 top-1/2 h-1/3 w-1/3 max-h-20 max-w-20 -translate-x-1/2 -translate-y-1/2 text-brand/80 transition duration-500 group-hover:scale-125" strokeWidth={1.3} />
        </>
      )}
    </div>
  );
}
