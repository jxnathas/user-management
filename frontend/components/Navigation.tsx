'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Gerenciamento de Usuários
        </Link>
        <div className="flex gap-4">
          <Link
            href="/users"
            className={`px-3 py-2 rounded transition ${
              pathname === '/users' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Usuários
          </Link>
          <Link
            href="/profiles"
            className={`px-3 py-2 rounded transition ${
              pathname === '/profiles' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Perfis
          </Link>
        </div>
      </div>
    </nav>
  );
}
