import { NavLink } from 'react-router-dom';
import { 
  Chat24Regular, 
  Video24Regular, 
  People24Regular, 
  Calendar24Regular, 
  Alert24Regular,
} from '@fluentui/react-icons';
import { Icon } from '@fluentui/react';

const Sidebar = () => {
  return (
    <aside className="w-[70px] bg-[#ebebeb] flex flex-col items-center">
      <div className="mt-4">
        <Icon 
          iconName="TeamsLogo" 
          className="text-[#5b5fc7] text-xl" 
          style={{ fontSize: '22px' }} 
        />
      </div>
      
      <nav className="flex-grow flex flex-col items-center mt-6 space-y-8">
        <NavItem to="/chat" icon={<Chat24Regular />} label="Chat" />
        <NavItem to="/meet" icon={<Video24Regular />} label="Meet" />
        <NavItem to="/communities" icon={<People24Regular />} label="Communities" />
        <NavItem to="/calendar" icon={<Calendar24Regular />} label="Calendar" />
        <NavItem to="/activity" icon={<Alert24Regular />} label="Activity" />
      </nav>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex flex-col items-center p-2 rounded-md
        ${isActive ? 'bg-[#d0d0d0]' : 'hover:bg-[#d0d0d0]'}
      `}
    >
      <div>{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

export default Sidebar;