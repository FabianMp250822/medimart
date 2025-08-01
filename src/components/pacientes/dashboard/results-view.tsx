
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ResultsView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados Médicos</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí se mostrará la tabla con los resultados médicos del paciente.</p>
         {/* TODO: Implementar la lógica para obtener y mostrar los resultados */}
      </CardContent>
    </Card>
  );
}
