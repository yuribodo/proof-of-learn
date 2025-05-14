import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#2A2D3E] to-[#404660]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-[#E0E0E0]">
          Pronto para Começar sua Jornada?
        </h2>
        <p className="text-xl mb-8 text-[#E0E0E0]/80">
          Junte-se a milhares de estudantes que já transformaram seu aprendizado em conquistas únicas.
        </p>
        <Button
          size="lg"
          className="bg-gradient-to-r from-[#6D4AFF] to-[#B668FF] text-white cursor-pointer transform transition-transform duration-200 hover:scale-105"
        >
          Criar Minha Conta <ArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
