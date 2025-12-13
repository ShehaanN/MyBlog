"use client";

import CMSHeader from "@/components/cms-header";
import CMSSidebar from "@/components/cms-sidebar";

const CategoriesPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <CMSSidebar />

      <div className="flex-1 flex flex-col">
        <CMSHeader />
        <h1>Categories Page</h1>
      </div>
    </div>
  );
};

export default CategoriesPage;
