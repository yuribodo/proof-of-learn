"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-center h-screen bg-[#121212] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute bg-[#6D4AFF] rounded-full w-96 h-96 top-1/4 left-1/3 filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1.5 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute bg-[#B668FF] rounded-full w-72 h-72 bottom-1/4 right-1/3 filter blur-2xl"
      />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-heading font-bold text-[#E0E0E0] mb-6"
        >
          Learn, Conquer, Collect
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-[#E0E0E0]/80 max-w-2xl mx-auto mb-8"
        >
          Personalized roadmaps, interactive quizzes, and NFTs as rewards for your learning journey.
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={() => navigate('/roadmaps')} size="lg" className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105">
            Get Started <ArrowRight className="ml-2" />
          </Button>
          <Button onClick={() => navigate('/roadmaps')} size="lg" variant="outline" className="border-[#6D4AFF] text-[#6D4AFF] hover:bg-[#6D4AFF]/10 hover:text-white cursor-pointer transform transition-transform duration-200 hover:scale-105">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
