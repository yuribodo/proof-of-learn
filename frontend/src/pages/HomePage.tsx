import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CTASection } from '@/components/CTASection';
import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <div className='bg-[#121212]  relative min-h-screen overflow-hidden  w-screen'>

    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute rounded-full bg-[#B668FF] w-74 h-74 top-3/6 left-3/5 filter blur-3xl"
      />  
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute rounded-full bg-[#6D4AFF] w-96 h-96 top-1/4 left-1/5 filter blur-2xl"
      />  
        <div className="relative min-h-screen bg-transparent text-[#E0E0E0] overflow-hidden">
            <Navbar />
            <div className="relative z-10">
                <HeroSection />
                <FeaturesSection />
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.2, scale: 2 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute rounded-full bg-[#6D4AFF] w-64 h-64 bottom-1/12 left-1/3 filter blur-2xl"
                    />  
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.2, scale: 2 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="absolute rounded-full bg-[#6D4AFF] w-48 h-48 bottom-1/24 left-4/8 filter blur-3xl"
                    />  
                <CTASection />
            </div>
        </div>
        
    </div>
  );
}
