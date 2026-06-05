"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        router.replace("/login");
      } else if (user && isPublicRoute) {
        router.replace("/");
      }
    }
  }, [user, loading, pathname, isPublicRoute, router]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
      </div>
    );
  }

  // Prevent rendering protected content if not authenticated
  if (!user && !isPublicRoute) {
    return null;
  }

  // Prevent rendering login/signup if already authenticated
  if (user && isPublicRoute) {
    return null;
  }

  return <>{children}</>;
}
