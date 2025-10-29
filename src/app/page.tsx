import Logo from '@/components/Logo';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="p-8 space-y-4">
      <Logo size="lg" className="text-primary mb-8" />
    </div>
  );
}
