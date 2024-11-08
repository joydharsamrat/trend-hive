"use client";

import Link from "next/link";
import ScrollEffectWrapper from "./ScrollEffectWrapper";
import Image from "next/image";
import { logout } from "@/actions/registerUser";
import { useUser } from "@/context/userProvider";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const { user, setIsLoading: userLoading } = useUser();
  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  return (
    <ScrollEffectWrapper>
      <div className="navbar  text-white max-w-7xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user?.role === "admin" && (
                <li>
                  <Link href="/user/orders">Orders</Link>
                </li>
              )}
              {user?.role === "admin" && (
                <li>
                  <Link href="/admin/productManagement">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <Link
            href="/"
            className="flex items-center justify-center gap-1 text-3xl text-white font-bold "
          >
            <Image
              width={40}
              height={40}
              src="/logo.png"
              alt="tend hive logo"
            />
            <p>TrendHive</p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user?.role === "admin" && (
              <li>
                <Link href="/user/orders">Orders</Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li>
                <Link href="/admin/productManagement">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {!user ? (
            <Link href="/login" className=" btn-outline-neutral">
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={handleLogout} className=" btn-secondary">
                Logout
              </button>
              {user.role === "user" && (
                <Link
                  href="/user/cart"
                  className="rounded-full bg-secondary-700 p-2"
                >
                  <FaShoppingCart className="text-lg" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </ScrollEffectWrapper>
  );
};

export default NavBar;
