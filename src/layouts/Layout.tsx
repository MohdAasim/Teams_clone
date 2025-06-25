import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f5f5f5] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow overflow-auto p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;