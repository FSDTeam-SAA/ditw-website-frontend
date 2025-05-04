"use client";

import { Navbar as NavbarDataType } from "@/components/types/allFrontendDataType";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

type NavbarProps = {
  data?: NavbarDataType;
};

const Navbar: React.FC<NavbarProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-toggle")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!data) return null;

  // Function to handle title change
  const handleTitleChange = (title: string) => {
    if (typeof window !== "undefined") {
      document.title = `DITW - ${title}`;
    }
  };

  return (
    <div className="bg-[#D9D9D9] sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* logo */}
        <div>
          <Link href="/" onClick={() => handleTitleChange("Home")}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Navbars/${data?.logo}`}
              alt="nav logo"
              width={235}
              height={90}
              className="w-[160px] h-[60px] sm:w-[180px] sm:h-[70px] md:w-[235px] md:h-[90px]"
            />
          </Link>
        </div>

        {/* large device menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-4 lg:gap-[54px]">
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              <Link
                href={data?.itemlink1}
                onClick={() => handleTitleChange(data?.itemname1 ?? "")}
              >
                {data?.itemname1}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              <Link
                href={data?.itemlink2}
                onClick={() => handleTitleChange(data?.itemname2 ?? "")}
              >
                {data?.itemname2}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              <Link
                href={data?.itemlink3}
                onClick={() => handleTitleChange(data?.itemname3 ?? "")}
              >
                {data?.itemname3}
              </Link>
            </li>
            <li className="text-sm lg:text-base font-semibold text-black leading-normal cursor-pointer">
              <Link
                href={data?.itemlink4}
                onClick={() => handleTitleChange(data?.itemname4 ?? "")}
              >
                {data?.itemname4}
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile menu button */}
        <div className="block md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 menu-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <RxCross2 className="w-6 h-6" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform mobile-menu ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Navbars/${data?.logo}`}
              alt="nav logo"
              width={160}
              height={60}
              className="w-[130px] h-[50px]"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <RxCross2 className="w-6 h-6" />
            </button>
          </div>
          <div className="h-full overflow-y-auto">
            <ul className="flex flex-col items-center gap-8 p-8">
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href={data?.itemlink1}
                  onClick={() => {handleTitleChange(data?.itemname1 ?? ""); setIsOpen(false)}}
                >
                  {data?.itemname1}
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href={data?.itemlink2}
                  onClick={() => { handleTitleChange(data?.itemname2 ?? ""); setIsOpen(false);}}
                >
                  {data?.itemname2}
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href={data?.itemlink3}
                  onClick={() => {handleTitleChange(data?.itemname3 ?? ""); setIsOpen(false)}}
                >
                  {data?.itemname3}
                </Link>
              </li>
              <li className="text-base font-semibold text-black leading-normal cursor-pointer w-full text-center">
                <Link
                  href={data?.itemlink4}
                  onClick={() => {handleTitleChange(data?.itemname4 ?? ""); setIsOpen(false)}}
                >
                  {data?.itemname4}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
