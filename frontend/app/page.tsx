import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-8 py-20">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl font-semibold tracking-tight text-black dark:text-white mb-4">
            Sistema de Gerenciamento de Usuários
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Uma aplicação simples e elegante para gerenciar usuários e seus perfis.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link
            href="/users"
            className="group relative flex items-center gap-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 p-4 transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            <div className="flex flex-1 flex-col">
              <p className="font-medium text-blue-900 dark:text-blue-100">Usuários</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Gerenciar e visualizar todos os usuários</p>
            </div>
            <span className="text-xl text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">→</span>
          </Link>

          <Link
            href="/profiles"
            className="group relative flex items-center gap-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 p-4 transition-all hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800"
          >
            <div className="flex flex-1 flex-col">
              <p className="font-medium text-blue-900 dark:text-blue-100">Perfis</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Gerenciar perfis de usuários</p>
            </div>
            <span className="text-xl text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">→</span>
          </Link>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Funcionalidades</h2>
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
              <span>Criar, visualizar, atualizar e deletar usuários</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
              <span>Gerenciar perfis de usuários com controle de acesso baseado em papéis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
              <span>Interface limpa e minimalista inspirada em macOS</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
              <span>Construído com Next.js, TypeScript e Tailwind CSS</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-sm text-zinc-600 dark:text-zinc-400">
          <p>Sistema de Gerenciamento de Usuários • Construído com Next.js</p>
        </div>
      </div>
    </div>
  );
}
