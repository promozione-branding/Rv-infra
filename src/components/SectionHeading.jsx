import Reveal from  "@/components/Reveal";
export default function SectionHeading({ eyebrow, title, text, dark = false, children }) {
  return (
    <Reveal className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="eyebrow mb-1">{eyebrow}</div>
        <h2 className={`text-3xl font-bold sm:text-5xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      </div>
      {text && <p className={`max-w-md text-sm leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>{text}</p>}
      {children}
    </Reveal>
  );
}
