export function SectionHeader({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`reveal mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="mb-4 text-xs font-bold uppercase text-cyanNeon">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">{text}</p>}
    </div>
  );
}

export default SectionHeader;
