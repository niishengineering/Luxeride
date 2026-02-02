"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "./Button";
import { useAuthStore } from "@/lib/store/useAuthStore";
// 1. IMPORT useShallow
import { useShallow } from 'zustand/react/shallow';
import { checkAuthSession } from "@/lib/api/auth";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "City Tours", path: "/city-tours" },
  { name: "Events", path: "/events" },
  { name: "Parties", path: "/parties" },
  { name: "Mobility", path: "/mobility-equipment" },
  { name: "Moving", path: "/moving-services" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // 2. WRAP SELECTOR IN useShallow
  const { user, clearUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      clearUser: state.clearUser,
    }))
  );

  useEffect(() => {
    const validateSession = async () => {
      if (user) {
        const isValid = await checkAuthSession();
        if (!isValid) {
          clearUser(); 
        }
      }
    };
    validateSession();
  }, [user, clearUser]);

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
          fixed top-16 left-0 right-0 z-50
          transition-all duration-300
          ${
            isScrolled
              ? "bg-black/95 backdrop-blur-md shadow-lg py-2"
              : "bg-transparent py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0 group"
            >
              <span className="text-2xl font-bold text-grey-pastel tracking-tight group-hover:text-primary transition-colors">
                Luxeridex<span className="text-gray-400">DMV</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                    ${
                      pathname === link.path
                        ? "text-primary bg-white/10"
                        : "text-gray-300 hover:text-grey-pastel hover:bg-white/5"
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
              {user && (
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-6 h-6 rounded-full bg-dark-lighter border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-lg hover:border-primary transition-colors duration-300"
                  aria-label="Go to profile"
                >
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-primary">
                      {user.first_name && user.last_name
                        ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
                        : 'U'}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-grey-pastel hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden pt-24 bg-black/98 backdrop-blur-md overflow-y-auto"
          >
            <div className="flex flex-col p-6 mt-4 space-y-2 pb-24">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.path}
                    className={`
                      block px-4 py-3 rounded-lg text-lg font-medium transition-colors
                      ${
                        pathname === link.path
                          ? "text-primary bg-white/10"
                          : "text-gray-300 hover:text-grey-pastel hover:bg-white/5"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 space-y-4"
              >
                {!user && (
                  <Link href="/login" className="block w-full">
                    <Button variant="outline" size="lg" fullWidth>
                      Log In / Register
                    </Button>
                  </Link>
                )}

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
    </>
  );
}