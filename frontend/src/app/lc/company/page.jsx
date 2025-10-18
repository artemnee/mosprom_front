"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import CommunityDetail from "@/components/CommunityDetail";
import CommunityOverview from "@/components/CommunityOverview";
import DashboardContent from "@/components/DashboardContent";
import HeaderLc from "@/components/HeaderLc";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import EmptyState from "@/components/ui/EmptyState";
import { menuItems, recentActivity, stats } from "@/config/mockData/lcData";

export default function EnterpriseDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const pathname = usePathname();

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedCommunity(null);
  };

  return (
    <div className="min-h-screen flex pb-16 lg:pb-0">
      <Sidebar
        isOpen={sidebarOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        menuItems={menuItems}
      />

      <MobileNavigation
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <HeaderLc
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          activeSection={activeSection}
          menuItems={menuItems}
          pathname={pathname}
        />

        <main className="flex-1 overflow-y-auto md:rounded-tl-xl  bg-gray-100/90">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8 ">
            {activeSection === "dashboard" ? (
              <DashboardContent stats={stats} recentActivity={recentActivity} />
            ) : activeSection === "community" ? (
              selectedCommunity ? (
                <CommunityDetail
                  community={selectedCommunity}
                  onBack={() => setSelectedCommunity(null)}
                />
              ) : (
                <CommunityOverview onSelectCommunity={setSelectedCommunity} />
              )
            ) : (
              <EmptyState activeSection={activeSection} menuItems={menuItems} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
