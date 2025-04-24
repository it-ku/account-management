import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { FaLock, FaUnlock, FaUserCog } from 'react-icons/fa';

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { id: 'password-encrypt', title: '密码加密', icon: <span className="mr-2"><FaLock /></span> },
  { id: 'password-decrypt', title: '密码解密', icon: <span className="mr-2"><FaUnlock /></span> },
  { id: 'account-management', title: '账号管理', icon: <span className="mr-2"><FaUserCog /></span> },
];

interface LayoutProps {
  children?: React.ReactNode;
  onMenuChange?: (menuId: string) => void;
}

export function Layout({ children, onMenuChange }: LayoutProps) {
  const [activeMenu, setActiveMenu] = useState<string>(menuItems[0].id);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 左侧菜单 */}
      <div className="w-64 bg-slate-100 border-r border-slate-200 h-full">
        <div className="p-4 pt-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">账号管理系统</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (onMenuChange) {
                      onMenuChange(item.id);
                    }
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    activeMenu === item.id
                      ? 'bg-slate-200 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  )}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {item.title}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 右侧工作区 */}
      <div className="flex-1 overflow-auto p-6">
        {children}
      </div>
    </div>
  );
}