import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Chat24Regular, 
  Video24Regular, 
  People24Regular, 
  Calendar24Regular, 
  Alert24Regular,
} from '@fluentui/react-icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 640;
      setIsMobile(mobile);
      setIsCollapsed(width < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Overlay for mobile - only shown when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          ${isCollapsed ? 'w-[48px]' : 'w-[70px]'} 
          ${isMobile ? 'absolute left-0 top-0 bottom-0 z-20' : 'relative'} 
          ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
          bg-[#ebebeb] flex flex-col items-center transition-transform duration-300 h-full
        `}
      >
       
        
        <nav className="flex-grow flex flex-col items-center w-full">
          <NavItem 
            to="/chat" 
            icon={<Chat24Regular />} 
            label="Chat" 
            isCollapsed={isCollapsed} 
            isActive={location.pathname === "/chat" || location.pathname === "/"} 
          />
          <NavItem 
            to="/meet" 
            icon={<Video24Regular />} 
            label="Meet" 
            isCollapsed={isCollapsed} 
            isActive={location.pathname === "/meet"} 
          />
          <NavItem 
            to="/communities" 
            icon={<People24Regular />} 
            label="Communities" 
            isCollapsed={isCollapsed}
            isActive={location.pathname === "/communities"} 
          />
          <NavItem 
            to="/calendar" 
            icon={<Calendar24Regular />} 
            label="Calendar" 
            isCollapsed={isCollapsed}
            isActive={location.pathname === "/calendar"} 
          />
          <NavItem 
            to="/activity" 
            icon={<Alert24Regular />} 
            label="Activity" 
            isCollapsed={isCollapsed}
            isActive={location.pathname === "/activity"} 
          />
        </nav>
      </aside>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

// Updated NavItem with full-width highlight
const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed, isActive = false }) => {
  return (
    <NavLink 
      to={to} 
      className={`
        flex flex-col items-center justify-center py-3
        w-full hover:bg-[#ffffffAA] transition-colors  ${isActive?"text-[#6264A7]":"text-[#949494] hover:text-[#6264A7]"}
      `}
    >
      <div className={`text-center`}>{icon}</div>
      {!isCollapsed && (
        <span 
          className={`text-[10px] mt-1`}
        >
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;