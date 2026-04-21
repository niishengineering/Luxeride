"use client";

import React from "react";
import Link from "next/link";
import { AppleIcon, SmartphoneIcon } from "lucide-react";

export function AppStoreBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/98 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-[0.5rem] pb-[0.7rem] sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Information (Previously contained App Download text) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink min-w-0">
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-primary transition-colors flex-shrink-0"
            >
              <span className="text-xs sm:text-sm text-primary font-medium truncate">
                Log In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
