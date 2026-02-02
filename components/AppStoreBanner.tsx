"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppleIcon, SmartphoneIcon } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
// Import the session check function
import { checkAuthSession } from "@/lib/api/auth"; 

export function AppStoreBanner() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // --- AUTH CHECK SECTION ---
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
  // --------------------------

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/98 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-[0.5rem] pb-[0.7rem] sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Download Message */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
              <SmartphoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-gray-400 truncate">
                Download our App
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500 hidden sm:block truncate">
                Book rides faster with our mobile app
              </div>
            </div>
          </div>

          {/* Right: App Store Badges */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <a
              href="#"
              className="xs:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black rounded-lg border border-gray-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all group min-w-0 flex-shrink"
            >
              <AppleIcon className="w-4 h-4 sm:w-6 sm:h-6 text-grey-pastel group-hover:text-primary transition-colors flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-grey-pastel leading-tight truncate">
                  App Store
                </div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black rounded-lg border border-gray-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all group min-w-0 flex-shrink"
            >
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5Z"
                  fill="#00D7FF"
                />
                <path
                  d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z"
                  fill="#FFCE00"
                />
                <path
                  d="M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.46 12.08L17.89 9.66L20.16 10.81Z"
                  fill="#00D863"
                />
                <path
                  d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"
                  fill="#FF3A44"
                />
              </svg>
              <div className="text-left min-w-0">
                <div className="text-[9px] sm:text-[10px] text-gray-500 leading-none truncate">
                  GET IT ON
                </div>
                <div className="text-xs sm:text-sm font-semibold text-grey-pastel leading-tight truncate">
                  Google Play
                </div>
              </div>
            </a>

            {!user ? (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-primary transition-colors flex-shrink-0"
              >
                <span className="text-xs sm:text-sm text-primary font-medium truncate">
                  Log In
                </span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="group hidden md:flex items-center gap-3 pl-1 pr-4 py-1 rounded-full border border-transparent hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                >
                  {/* Profile Avatar Container */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors bg-dark-charcoal flex items-center justify-center">
                    {user?.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-primary tracking-wide select-none">
                        {user?.first_name && user?.last_name
                          ? `${user.first_name.charAt(0).toUpperCase()}${user.last_name.charAt(0).toUpperCase()}`
                          : 'U'}
                      </span>
                    )}
                  </div>

                  {/* Name Text */}
                  <span className="text-sm font-semibold text-grey-pastel group-hover:text-primary transition-colors truncate max-w-[150px]">
                    {user?.first_name} {user?.last_name}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}