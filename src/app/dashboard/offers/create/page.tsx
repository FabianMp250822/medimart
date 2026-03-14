import { OfferForm } from '@/components/dashboard/offer-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function CreateOfferPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/offers">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icons.arrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Crear Oferta Laboral</h1>
          <p className="text-sm text-slate-500">Publica una nueva vacante para atraer candidatos.</p>
        </div>
      </div>

      <OfferForm />
    </div>
  );
}
