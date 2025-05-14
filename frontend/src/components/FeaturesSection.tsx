import React from 'react';
import { BookOpen, Trophy, Shield } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: 'Roadmaps Personalizados',
    description: 'Receba um plano de estudos personalizado baseado no seu nível e objetivos.',
    icon: BookOpen,
  },
  {
    title: 'Quiz Interativo',
    description: 'Teste seus conhecimentos e valide seu aprendizado com quizzes dinâmicos.',
    icon: Trophy,
  },
  {
    title: 'NFTs Autenticadas',
    description: 'Ganhe NFTs únicas como prova de suas conquistas educacionais.',
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-[#2A2D3E]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#E0E0E0] text-center mb-12">
          Como Funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="bg-[#1E1E24] p-6 rounded-[12px] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_16px_rgba(0,0,0,0.2)] transform transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <Icon className="w-12 h-12 text-[#6D4AFF] mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2 text-[#E0E0E0]">
                {title}
              </h3>
              <p className="text-base text-[#E0E0E0]/80">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
