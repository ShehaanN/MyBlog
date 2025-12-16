"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const CMSLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/auth/login");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default CMSLayout;
