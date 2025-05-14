import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Roadmap {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const mockRoadmaps: Roadmap[] = [
  {
    id: 1,
    title: 'JavaScript Essentials',
    description: 'Aprenda os fundamentos do JavaScript.',
    progress: 45,
    icon: Code,
  },
  {
    id: 2,
    title: 'React Avançado',
    description: 'Domine hooks, context e performance.',
    progress: 20,
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'SQL e Bancos de Dados',
    description: 'Modelagem e consultas SQL avançadas.',
    progress: 60,
    icon: Database,
  },
];

export function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">Meus Roadmaps</h1>
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white transform transition-transform duration-200 hover:scale-105 cursor-pointer"
        >
          Novo Roadmap
        </Button>
      </div>
      <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoadmaps.map(({ id, title, description, progress, icon: Icon }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.1, duration: 0.5, ease: 'easeOut' }}
            className="bg-[#2A2D3E] p-6 rounded-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex flex-col"
          >
            <Icon className="w-8 h-8 text-[#6D4AFF] mb-4" />
            <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
            <p className="text-base text-[#E0E0E0]/80 mb-4 flex-grow">{description}</p>
            <div className="mb-4">
              <div className="w-full bg-[#4A4A5A] rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-[#41E988]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-[#E0E0E0]/60 mt-2 block">{progress}% completo</span>
            </div>
            <Button
              size="default"
              className="mt-auto bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
            >
              Continuar
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
