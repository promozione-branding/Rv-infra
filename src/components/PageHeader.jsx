import Reveal from "./Reveal";
export default function PageHeader({ eyebrow, title, text }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-16 pt-36">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
      <div className="container-x relative">
        <Reveal><div className="eyebrow !text-brand">{eyebrow}</div></Reveal>
        <Reveal delay={0.1}><h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1></Reveal>
        {text && <Reveal delay={0.2}><p className="mt-4 max-w-2xl text-slate-300">{text}</p></Reveal>}
      </div>
    </section>
  );
}
