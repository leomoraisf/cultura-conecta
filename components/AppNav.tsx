export default function AppNav() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Artistas", href: "/artistas" },
    { label: "Editais", href: "/editais" },
    { label: "Matches", href: "/matches" },
  ];

  return (
    <header className="border-b border-zinc-800 bg-[#0B0B12]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Cultura Conecta</h1>
          <p className="text-sm text-zinc-400">
            Plataforma de matchmaking cultural
          </p>
        </div>

        <nav className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}