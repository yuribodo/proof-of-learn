import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-[#E0E0E0] p-4"
    >
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="text-[96px] font-bold mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl mb-6"
      >
        Página não encontrada
      </motion.p>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> Voltar para Home
      </Button>
    </motion.div>
  );
}
