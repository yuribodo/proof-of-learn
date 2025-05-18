import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CTASection } from '@/components/CTASection';

export function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#121212] text-[#E0E0E0] overflow-x-hidden">
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </div>
  );
}
