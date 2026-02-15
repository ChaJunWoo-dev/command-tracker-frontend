import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <div className="flex-1 w-full max-w-5xl mx-auto py-5 px-4">
        <Outlet />
      </div>
      <footer className="w-full py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Command Tracker. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
