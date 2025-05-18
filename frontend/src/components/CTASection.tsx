import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative py-24 bg-[#121212] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.18, scale: 1.7 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute bg-[#6D4AFF] rounded-full w-96 h-96 top-1/4 left-1/3 filter blur-3xl z-0"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.13, scale: 1.3 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute bg-[#B668FF] rounded-full w-72 h-72 bottom-1/4 right-1/3 filter blur-2xl z-0"
        aria-hidden
      />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold mb-8 text-[#E0E0E0] tracking-tight"
        >
          Pronto para Começar sua Jornada?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl mb-10 text-[#E0E0E0]/80 max-w-2xl mx-auto"
        >
          Junte-se a milhares de estudantes que já transformaram seu aprendizado em conquistas únicas.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105 shadow-lg px-8 py-4 text-lg"
          >
            Criar Minha Conta <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
