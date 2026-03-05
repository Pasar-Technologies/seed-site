import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AdPostPage from "./features/registration/AdPostPage";
import UsersPage from "./features/users/UsersPage";
import AdsPage from "./features/ads/AdsPage";
import AddressPage from "./features/address/AddressPage";

const NAV_ITEMS = [
  { to: "/", icon: "✦", label: "Register Ad" },
  { to: "/users", icon: "◈", label: "Users" },
  { to: "/ads", icon: "◉", label: "Ads" },
];

function App() {
  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-150 ${
      isActive
        ? "bg-white/10 text-white font-semibold"
        : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
    }`;

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-100">
        {/* Sidebar */}
        <aside className="w-56 bg-slate-900 fixed h-full flex flex-col">
          {/* Logo */}
          <div className="px-5 py-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-wide">Pasar</div>
                <div className="text-slate-500 text-xs">Seed Site</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-4 mb-2">Menu</p>
            {NAV_ITEMS.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} className={navItemStyles}>
                <span className="text-base w-5 text-center">{icon}</span>
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-white/10">
            <p className="text-xs text-slate-600">v1.0.4 · 2026</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-56 min-h-screen">
          <Routes>
            <Route path="/" element={<AdPostPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/ads" element={<AdsPage />} />
            <Route path="/seed-site/user/addresses/:userId" element={<AddressPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
