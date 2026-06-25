const navItems = [
  { label: "Início", href: "/" },
  { label: "Painel", href: "/dashboard" },
  { label: "Artistas", href: "/artistas" },
  { label: "Editais", href: "/editais" },
  { label: "Matches", href: "/matches" },
];

export default function AppNav() {
  return (
    <header className="border-b-4 border-[#241C15] bg-[#F6EAD2]/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <a href="/" className="group">
          <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-[#241C15] shadow-[4px_4px_0_#241C15]">
            Cultura viva
          </div>

          <h1 className="mt-3 text-3xl font-black tracking-tight text-[#241C15] md:text-4xl">
            Cultura Conecta
          </h1>

          <p className="text-sm font-semibold text-[#5D6B3F]">
            Matchmaking artesanal para editais culturais
          </p>
        </a>

        <nav className="flex flex-wrap gap-3">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                "rounded-full border-2 border-[#241C15] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#241C15] shadow-[3px_3px_0_#241C15] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241C15]",
                index % 4 === 0
                  ? "bg-[#F6EAD2]"
                  : index % 4 === 1
                    ? "bg-[#D89B2B]"
                    : index % 4 === 2
                      ? "bg-[#B85C38] text-white"
                      : "bg-[#5D6B3F] text-white",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}