import { Link } from "react-router-dom";
import TokenHook from "../hook/tokenHook";

export default function Header() {
  const { isLogged } = TokenHook();
  return (
    <div className="relative mb-4 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {isLogged ? "Logout" : "log in"}
            {/* <Link to="/home">Logout</Link> */}
            {/* className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" */}
            {/* <Link
              to=""
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
