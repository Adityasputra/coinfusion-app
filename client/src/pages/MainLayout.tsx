import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  const navItems = [
    { to: "/market", label: "Coin Market" },
    { to: "/converter", label: "Converter" },
    { to: "/watchlist", label: "Watchlist" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/education", label: "Education" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 px-6 py-4 shadow-md flex items-center gap-6">
        <h1 className="text-xl font-bold text-cyan-400">CryptoApp</h1>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded-md transition ${
                  isActive
                    ? "bg-cyan-500 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
