import React from 'react';
import { BookOpen, Trophy, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: 'Personalized Roadmaps',
    description: 'Get a personalized study plan based on your level and goals.',
    icon: BookOpen,
  },
  {
    title: 'Interactive Quiz',
    description: 'Test your knowledge and validate your learning with dynamic quizzes.',
    icon: Trophy,
  },
  {
    title: 'Authenticated NFTs',
    description: 'Earn unique NFTs as proof of your educational achievements.',
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative pt-0 pb-0 bg-transparent overflow-visible"
    >
      <div className="relative z-10 container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold text-[#E0E0E0] text-center mb-10 tracking-tight"
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="flex items-center justify-center mb-6"
              >
                <Icon className="w-14 h-14 text-[#6D4AFF] drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl font-heading font-semibold mb-2 text-[#E0E0E0] tracking-tight">
                {title}
              </h3>
              <p className="text-lg text-[#E0E0E0]/80 font-inter">
                {description}
              </p>
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none group-hover:bg-[#6D4AFF]/10 transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
