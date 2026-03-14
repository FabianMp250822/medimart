'use client';

import { cn } from '@/lib/utils';
import { ApplicationStatus } from '@/types/postulacion';
import { CheckCircle2, Circle, Clock, XCircle, UserPlus, RefreshCw } from 'lucide-react';

interface StatusStepperProps {
  currentStatus: ApplicationStatus;
  onChange?: (newStatus: ApplicationStatus) => void;
  isReadOnly?: boolean;
}

const statuses: { label: ApplicationStatus; icon: any; color: string; bg: string }[] = [
  { label: 'Pendiente', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'En Proceso', icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Espera', icon: Circle, color: 'text-slate-400', bg: 'bg-slate-50' },
  { label: 'Contratado', icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Rechazado', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
];

export function StatusStepper({ currentStatus, onChange, isReadOnly = false }: StatusStepperProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => {
        const Icon = status.icon;
        const isActive = (currentStatus || '').toString().toLowerCase() === status.label.toLowerCase();
        
        return (
          <button
            key={status.label}
            type="button"
            disabled={isReadOnly}
            onClick={() => onChange?.(status.label)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold",
              isActive 
                ? `${status.bg} ${status.color} border-current shadow-sm` 
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300",
              !isReadOnly && "cursor-pointer"
            )}
          >
            <Icon className={cn("w-3.5 h-3.5", isActive && "animate-pulse")} />
            {status.label}
          </button>
        );
      })}
    </div>
  );
}
