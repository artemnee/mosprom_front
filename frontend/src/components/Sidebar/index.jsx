import SidebarLogo from "@/components/Sidebar/elements/SidebarLogo";
import SidebarMenu from "@/components/Sidebar/elements/SidebarMenu";
import SidebarUser from "@/components/Sidebar/elements/SidebarUser";

const Sidebar = ({
  isOpen,
  activeSection,
  onSectionChange,
  menuItems,
  onToggleSidebar,
  isUser,
}) => {
  return (
    <aside
      className={`hidden lg:flex fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="h-full flex flex-col w-full">
        <SidebarLogo isOpen={isOpen} onToggleSidebar={onToggleSidebar} />
        <SidebarMenu
          items={menuItems}
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          isOpen={isOpen}
        />
        <SidebarUser isOpen={isOpen} isUser={isUser} />
      </div>
    </aside>
  );
};

export default Sidebar;
