import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 sm:px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">BlogSpace</div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/homePage"
              className="hover:text-purple-200 font-semibold transition-all duration-200 flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-purple-500"
            >
              <svg
    
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/createBlog"
              className="hover:text-purple-200 font-semibold transition-all duration-200 flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-purple-500"
            >
              <svg
              
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
