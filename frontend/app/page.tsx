import Link from "next/link";
import { Card, CardBody } from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/users" className="group">
            <Card hoverable={true}>
              <CardBody className="flex items-center gap-4">
                <div className="flex flex-1 flex-col">
                  <p className="font-semibold text-black dark:text-white">Usuários</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Gerenciar e visualizar todos os usuários</p>
                </div>
                <span className="text-2xl text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">→</span>
              </CardBody>
            </Card>
          </Link>

          <Link href="/profiles" className="group">
            <Card hoverable={true}>
              <CardBody className="flex items-center gap-4">
                <div className="flex flex-1 flex-col">
                  <p className="font-semibold text-black dark:text-white">Perfis</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Gerenciar perfis de usuários</p>
                </div>
                <span className="text-2xl text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">→</span>
              </CardBody>
            </Card>
          </Link>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-6">Funcionalidades</h2>
          <Card hoverable={false}>
            <CardBody>
              <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
                  <span>Criar, visualizar, atualizar e deletar usuários</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-zinc-400 dark:text-zinc-600 mt-1">•</span>
                  <span>Gerenciar perfis de usuários</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 text-sm text-zinc-600 dark:text-zinc-400">
          <p>Sistema de Gerenciamento de Usuários • Construído com Next.js • TypeScript • Tailwind CSS • Nest.js</p>
        </div>
      </div>
    </div>
  );
}
