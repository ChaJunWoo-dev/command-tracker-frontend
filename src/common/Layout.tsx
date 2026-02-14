import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col items-center py-5 px-4 w-full max-w-4xl mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
