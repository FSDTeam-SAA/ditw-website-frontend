"use client";
import Image from "next/image";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#D9D9D9] sticky top-0 z-50">
      <div className="container flex items-center gap-[150px] lg:gap-[200px] 2xl:gap-[224px]">
        {/* logo  */}
        <div>
          <Image
            src="/assets/logo.png"
            alt="nav logo"
            width={235}
            height={90}
            className="w-[235px] h-[90px]"
          />
        </div>
        {/*large device menu part  */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-[54px]">
            <li className="text-base font-semibold text-black leading-normal cursor-pointer">
              Home
            </li>
            <li className="text-base font-semibold text-black leading-normal cursor-pointer">
              About Us
            </li>
            <li className="text-base font-semibold text-black leading-normal cursor-pointer">
              Services
            </li>
            <li className="text-base font-semibold text-black leading-normal cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>
        {/* small device menu part  */}
        <div className="block md:hidden">
          {isOpen ? (
            <RxCross2 onClick={() => setIsOpen(!isOpen)} className="w-7 h-7" />
          ) : (
            <GiHamburgerMenu
              onClick={() => setIsOpen(!isOpen)}
              className="w-7 h-7"
            />
          )}

          {isOpen && (
            <div
              className={`${
                isOpen ? "w-[70%] left-0" : "w-full left-[100%]"
              } h-[60%] fixed top-0 z-20 bg-white`}
            >
              <div className="w-full flex items-center justify-center py-5">
                <Image
                  src="/assets/logo.png"
                  alt="nav logo"
                  width={235}
                  height={90}
                  className="w-[235px] h-[90px]"
                />
              </div>
              <ul className="flex flex-col justify-center items-center gap-[54px]">
                <li className="text-base font-semibold text-black leading-normal cursor-pointer">
                  Home
                </li>
                <li className="text-base font-semibold text-black leading-normal cursor-pointer">
                  About Us
                </li>
                <li className="text-base font-semibold text-black leading-normal cursor-pointer">
                  Services
                </li>
                <li className="text-base font-semibold text-black leading-normal cursor-pointer">
                  Contact Us
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
