import { MdOutlineShoppingBag } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";

import { ReactNode } from "react";

export type SidebarContentType = {
    id: number;
    name: string;
    icon: ReactNode;
    href: string;
};

export const Sidebarcontents: SidebarContentType[] = [
    {
        id: 1,
        name: "Navbar",
        icon: <MdOutlineShoppingBag className="w-4 h-4"/>, 
        href: "/admin-dashboard/navbar",
    },
    {
        id: 2,
        name: "Banner",
        icon: <MdOutlineShoppingBag className="w-4 h-4"/>, 
        href: "/admin-dashboard/banner",
    },
    {
        id: 3,
        name: "About Us",
        icon: <AiOutlineBars className="w-4 h-4"/>, 
        href: "/admin-dashboard/about-us",
    },
    {
        id: 4,
        name: "Services",
        icon: <IoCartOutline className="w-4 h-4"/>, 
        href: "/admin-dashboard/services",
    },
    {
        id: 5,
        name: "Contact Us",
        icon: <FiUsers className="w-4 h-4"/>, 
        href: "/admin-dashboard/contact-us",
    },
];
