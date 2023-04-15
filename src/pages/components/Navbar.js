//import
import Link from "next/link";

import { useState } from "react";

//components
import ConnectButton from "./ConnectButton";

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const mobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
            <nav className="bg-[#3F72AF]">
                <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="relative flex items-center justify-between h-12">
                
                    {/*Title*/}
                    <div className="flex-grow">
                    <div>
                        <Link href="/" className="text-white hover:text-[#FDD36A] font-bold text-3xl">
                            HSU
                        </Link>
                    </div>
                    </div>

                    {/*Desktop Menu*/}
                    <div className="hidden sm:flex ">
                        <Link href="/Games" className="text-white hover:text-[#FDD36A] font-bold text-xl px-2">
                            Games
                        </Link>
                        <ConnectButton />
                    </div>

                    {/*Menu Button*/}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <button
                          type="button"
                          className="rounded-md hover:bg-gray-700 p-2 transition duration-200 ease-in-out"
                          onClick={mobileMenu}  
                        >
                            <svg
                              className="h-6 w-6"
                              stroke="white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                            {isMobileMenuOpen ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                            </svg>
                        </button>
                    </div>
                </div>
                </div>
                    {/*Mobile Menu*/}

                    {isMobileMenuOpen && (
                    <div className="sm:hidden">
                        <div className="px-2 pt-2 pb-3">
                            <ConnectButton />
                            <Link href="/Games" className="px-5 py-1 block rounded-md hover:text-[#FDD36A] hover:bg-gray-700 text-white font-bold text-xl px-2 transition duration-600 ease-in-out">
                                Games
                            </Link>
                        </div>
                    </div>
                    )}
                
                
            </nav>
        </>
    )
}
export default Navbar;