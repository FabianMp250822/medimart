
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AppointmentsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendar Cita</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí irá el formulario de varios pasos para agendar una cita médica.</p>
        {/* TODO: Implementar el stepper y los formularios */}
      </CardContent>
    </Card>
  );
}
