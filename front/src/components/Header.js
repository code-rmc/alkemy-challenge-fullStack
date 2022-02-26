import { NavLink, Link } from "react-router-dom";

import TokenHook from "../hook/tokenHook";

export default function Header() {
  const { isLogged, logout } = TokenHook();
  return (
    <>
      {isLogged && (
        <div className="relative mb-4 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                <nav>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-gray-200 mr-3"
                        : "whitespace-nowrap text-sm font-medium text-gray-400 hover:text-gray-200 mr-3"
                    }
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <Link to="home">
                    <button
                      className="whitespace-nowrap text-sm font-medium text-gray-400 hover:text-gray-200"
                      onClick={() => logout()}
                    >
                      Logout
                    </button>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
