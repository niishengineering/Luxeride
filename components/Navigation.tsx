"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import NextImage from "next/image";
import { Button } from "./Button";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "City Tours",
    path: "/city-tours",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "Parties",
    path: "/parties",
  },
  {
    name: "Mobility",
    path: "/mobility-equipment",
  },
  {
    name: "Moving",
    path: "/moving-services",
  },
  {
    name: "Loading",
    path: "/loading",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`
          fixed top-29 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">


            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                    ${pathname === link.path
                      ? "text-primary bg-white/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/limo-booking">
                <Button variant="primary" size="md">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="fixed inset-0 z-40 lg:hidden pt-24 bg-black/98 backdrop-blur-md overflow-y-auto"
          >
            <div className="flex flex-col p-6 space-y-2 pb-24">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={link.path}
                    className={`
                      block px-4 py-3 rounded-lg text-lg font-medium transition-colors
                      ${pathname === link.path
                        ? "text-primary bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: navLinks.length * 0.05,
                }}
                className="pt-4 space-y-4"
              >
                <Link href="/login" className="block w-full">
                  <Button variant="outline" size="lg" fullWidth>
                    Log In / Register
                  </Button>
                </Link>
                <Link href="/limo-booking" className="block w-full">
                  <Button variant="primary" size="lg" fullWidth>
                    Book Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-4 bg-black/95 backdrop-blur-md border-t border-white/10 flex space-x-4">
        <Link href="/limo-booking" className="flex-1">
          <Button variant="primary" size="lg" fullWidth>
            Book Now
          </Button>
        </Link>
      </div> */}
    </>
  );
}
