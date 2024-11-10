"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductManagementLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isActiveTab = (path: string) => pathname === path;

  return (
    <div className="p-4">
      <div className="flex border-b border-gray-300 mb-4">
        {/* Products Tab */}
        <Link href="/admin/product-management/product">
          <button
            className={`px-4 py-2 font-medium ${
              isActiveTab("/admin/product-management/product")
                ? "border-b-2 border-primary-500 text-primary-700"
                : "text-gray-500 hover:text-primary-700"
            }`}
          >
            Products
          </button>
        </Link>

        {/* Categories Tab */}
        <Link href="/admin/product-management/category">
          <button
            className={`px-4 py-2 font-medium ${
              isActiveTab("/admin/product-management/category")
                ? "border-b-2 border-primary-500 text-primary-700"
                : "text-gray-500 hover:text-primary-700"
            }`}
          >
            Categories
          </button>
        </Link>
      </div>

      {/* Content Area */}
      <div>{children}</div>
    </div>
  );
};

export default ProductManagementLayout;
