'use client'

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SociapaLogo from '../../../public/img/SociapaLogo.png';
import { LayoutDashboard, Users, Heart, BarChart2, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';


const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Demographics', href: '/demographics', icon: Users },
  { name: 'Following', href: '/following', icon: Heart },
  { name: 'Channel Analysis', href: '/channelAnalysis', icon: BarChart2 },
  { name: 'Report', href: '/report', icon: FileText },
  // { name: 'Messages', href: '/messages', icon: MessageSquare },
  // { name: 'Login', href: '/login', icon: MessageSquare },
  // { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };
  
  useEffect(() => {
    const localStorageStatus = localStorage.getItem('isLoggedIn');
    if (localStorageStatus === "true") {
      router.push('/')
    }
  }, [router]);

  return (
    <div>
      {/* Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] text-white transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <Image src={SociapaLogo} width={100} height={100} alt="Sociapa" className="h-8 w-8" />
          <span className="text-xl font-semibold">Sociapa</span>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-2" onClick={handleLogout}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
