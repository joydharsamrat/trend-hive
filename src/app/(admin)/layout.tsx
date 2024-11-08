import Link from "next/link";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content   bg-white p-5">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <GiHamburgerMenu />
        </label>
        {children}
      </div>

      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 px-4 py-20 space-y-2">
          {/* Sidebar content here */}
          <li className=" rounded  bg-neutral-900 text-white">
            <Link href="/admin/product-management">Product Management</Link>
          </li>
          <li className=" rounded bg-neutral-900 text-white">
            <Link href="/admin/user-management">User Management</Link>
          </li>

          {/* <li className=" rounded bg-neutral-900 text-white">
            <Link href="/admin/order-management">Order Management</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
