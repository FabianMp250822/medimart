import { SpecialistForm } from '@/components/dashboard/specialist-form';

export default function CreateProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Crear Perfil Web</h1>
        <p className="text-slate-500">Agrega un nuevo especialista al directorio médico de la Clínica.</p>
      </div>
      
      <SpecialistForm />
    </div>
  );
}
