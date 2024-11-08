"use client";

import React, { useEffect, useState } from "react";

const ScrollEffectWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={` z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-black bg-opacity-30 backdrop-blur-sm fixed top-0 left-1/2 transform -translate-x-1/2 w-full"
          : "bg-neutral-900 "
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollEffectWrapper;
