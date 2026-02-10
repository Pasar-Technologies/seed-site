import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import AdPostPage from "./pages/AdPostPage";
import UsersPage from "./pages/UsersPage";
import AddressPage from "./pages/AddressPage";
import AdsPage from "./pages/AdsPage";

function App() {
  // Styles for NavLinks
  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-700 uppercase tracking-wider">
              Seed Site
            </h1>
          </div>

          <nav className="mt-4 px-4 space-y-2">
            <NavLink to="/" className={navItemStyles}>
              <span className="text-xl">📋</span>
              <span className="font-medium">Register Ad</span>
            </NavLink>

            <NavLink to="/users" className={navItemStyles}>
              <span className="text-xl">👥</span>
              <span className="font-medium">Users List</span>
            </NavLink>

            <NavLink to="/ads" className={navItemStyles}>
              <span className="text-xl">📢</span>
              <span className="font-medium">Ads</span>
            </NavLink>
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <div className="text-xs text-gray-400 text-center">
              v1.0.4 Build 2026
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<AdPostPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route
                path="/seed-site/user/addresses/:userId"
                element={<AddressPage />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
