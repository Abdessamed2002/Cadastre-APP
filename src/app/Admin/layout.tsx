"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    // Check if the user is logged in
    checkLoginStatus();

    // Optional: Listen for storage changes in the same tab
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false); // Update state immediately
    router.push('/Admin/AdminLogin');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 p-2">Admin Dashboard</h2>
          <nav>
            <ul>
              <li><Link href="/Admin" className="block py-2 px-4 hover:bg-gray-700">Tableau de bord</Link></li>
              <li><Link href="/Admin/delimitation" className="block py-2 px-4 hover:bg-gray-700">Deuxième Délimitation</Link></li>
              <li><Link href="/Admin/non-cadastre" className="block py-2 px-4 hover:bg-gray-700">Propriété non Cadastrée</Link></li>
              <li><Link href="/Admin/fraude" className="block py-2 px-4 hover:bg-gray-700">Fraude Immobilière</Link></li>
              <li><Link href="/Admin/conflit" className="block py-2 px-4 hover:bg-gray-700">Déclare Conflit</Link></li>
              <li><Link href="/Admin/cadastre-update" className="block py-2 px-4 hover:bg-gray-700">Cadastrale A jour</Link></li>
            </ul>
          </nav>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
