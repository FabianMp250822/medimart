import { Shield, Building2, Heart, FileText } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Entidades En Convenio - Clínica de la Costa',
  description: 'Trabajamos con las principales entidades de salud, ARL y seguros para brindarte la mejor atención. Contamos con más de 20 convenios activos.',
};

const conveniosData = {
  polizas: [
    { compania: 'Allianz Seguros Médicos', contrato: 'N/A', vigencia: 'Ene 2024 – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { compania: 'Panamerican Life', contrato: 'C-OP.RC-252023', vigencia: 'Feb 2024 – Feb 2026', servicio: 'Mediana y Alta Complejidad' },
    { compania: 'BMI', contrato: 'N/A', vigencia: 'Feb 2025 – Feb 2026', servicio: 'Mediana y Alta Complejidad' },
    { compania: 'Mundial de Seguros', contrato: '301224', vigencia: 'Dic 2024 – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { compania: 'Seguros Bolívar', contrato: 'N/A', vigencia: 'Dic 2024 – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
  ],
  medicinaPrepagada: [
    { compania: 'Colsanitas', contrato: 'CONT-COL-44001-C001889', vigencia: 'Desde 1 de marzo de 2025', servicio: 'Mediana y Alta Complejidad' },
    { compania: 'Coomeva Medicina Prepagada', contrato: 'N/A', vigencia: 'May 2025 – May 2026', servicio: 'Alta Complejidad' },
    { compania: 'Allianz Seguros Médicos', contrato: 'N/A', vigencia: 'Ene 2024 – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
  ],
  arl: [
    { cliente: 'Colmena ARL', contrato: 'CW2330472', vigencia: 'Dic 2023 – Dic 2025', servicio: 'Mediana y Alta Complejidad', estado: 'En ejecución' },
    { cliente: 'Positiva Compañía de Seguros', contrato: '0089-2022', vigencia: 'Ene 2024 – Ene 2026', servicio: 'Mediana y Alta Complejidad', estado: 'En ejecución' },
    { cliente: 'AXA Colpatria', contrato: 'ASIST-IPS-20-0000000138', vigencia: 'Ene 2024 – Dic 2025', servicio: 'Mediana y Alta Complejidad', estado: 'En ejecución' },
    { cliente: 'SURA ARL', contrato: '28122021', vigencia: 'Dic 2021 – Dic 2025', servicio: 'Mediana y Alta Complejidad', estado: 'En ejecución' },
  ],
  regimenExcepcion: [
    { cliente: 'FOMAG – Fiduprevisora', contrato: '12076-208-2025', vigencia: 'Ene – Jul 2025', servicio: 'Mediana y Alta Complejidad' },
    { cliente: 'SENA Atlántico', contrato: 'CO1.PCCNTR.7741267 / 7798700', vigencia: 'Abr – Dic 2025', servicio: 'Alta Complejidad y Atención Domiciliaria' },
    { cliente: 'Bavaria S.A.', contrato: 'N/A', vigencia: 'Ene – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { cliente: 'Policía Nacional – Regional Atlántico', contrato: '67-7-20144-25', vigencia: 'Ago 2025 – Mar 2026', servicio: 'Alta Complejidad' },
    { cliente: 'Base Naval ARC – Dispensario Médico Nivel II', contrato: 'Varios (039, 047, 056, 057, 069, 083)', vigencia: 'Abr 2025 – Mar 2026', servicio: 'Ayudas Diagnósticas, Oncología, Gastroenterología, Consulta Especializada, Alta Complejidad' },
    { cliente: 'Ejército Nacional (Sanidad BAS02)', contrato: 'Varios (198, 214, 216, 224, 229)', vigencia: 'Mar 2025 – Dic 2025', servicio: 'Alta Complejidad, Oncología, Gastroenterología, Consulta Especializada' },
  ],
  eps: [
    { eps: 'Mutual Ser EPS', contrato: '22063-2024', vigencia: 'Sep 2024 – Ago 2026', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Anas Wayuu EPSI', contrato: 'S049-2025', vigencia: 'Ene – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Dusakawi EPSI', contrato: '08001_041EV', vigencia: 'Mar – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Salud Total EPS', contrato: 'COE-14-BARRAN-3479', vigencia: 'Sep 2023 – Dic 2025', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Coosalud EPS S.A. (Contributivo)', contrato: '08001C00062157-25', vigencia: 'Abr 2025 – Mar 2026', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Coosalud EPS S.A. (Subsidiado)', contrato: '08001S00062156-25', vigencia: 'Abr 2025 – Mar 2026', servicio: 'Mediana y Alta Complejidad' },
    { eps: 'Coosalud EPS – Trasplantes', contrato: '08001C/S33061491-90-25', vigencia: 'May 2025 – Abr 2026', servicio: 'Trasplante renal y cardíaco' },
    { eps: 'Sura EPS', contrato: '83662-2024', vigencia: 'Jun 2025 – Ene 2026', servicio: 'Urgencia Vital' },
  ],
};

export default function EntidadesConvenioPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <Shield className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Entidades en Convenio</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Trabajamos con las principales entidades de salud, ARL y seguros para brindarte la mejor atención. 
          Contamos con más de 20 convenios activos.
        </p>
        <p className="text-sm text-muted-foreground italic">
          ¿Tu entidad no aparece en la lista?{' '}
          <a href="/contacto" className="text-primary hover:underline font-semibold">
            Contáctanos
          </a>{' '}
          para más información sobre nuestros convenios.
        </p>
      </div>

      {/* 1. Pólizas de Salud */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileText className="h-6 w-6 text-primary" />
            1. Clientes Pólizas de Salud
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compañía</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Servicio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conveniosData.polizas.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.compania}</TableCell>
                    <TableCell>{item.contrato}</TableCell>
                    <TableCell>{item.vigencia}</TableCell>
                    <TableCell>{item.servicio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 2. Medicina Prepagada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-primary" />
            2. Clientes Medicina Prepagada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compañía</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Servicio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conveniosData.medicinaPrepagada.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.compania}</TableCell>
                    <TableCell>{item.contrato}</TableCell>
                    <TableCell>{item.vigencia}</TableCell>
                    <TableCell>{item.servicio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 3. ARL */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building2 className="h-6 w-6 text-primary" />
            3. Clientes ARL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conveniosData.arl.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.cliente}</TableCell>
                    <TableCell>{item.contrato}</TableCell>
                    <TableCell>{item.vigencia}</TableCell>
                    <TableCell>{item.servicio}</TableCell>
                    <TableCell>
                      <Badge variant="default">{item.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 4. Régimen de Excepción */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-6 w-6 text-primary" />
            4. Clientes Régimen de Excepción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Servicio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conveniosData.regimenExcepcion.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.cliente}</TableCell>
                    <TableCell className="text-sm">{item.contrato}</TableCell>
                    <TableCell>{item.vigencia}</TableCell>
                    <TableCell className="text-sm">{item.servicio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 5. EPS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-primary" />
            5. Clientes EPS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>EPS</TableHead>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Servicio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conveniosData.eps.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.eps}</TableCell>
                    <TableCell>{item.contrato}</TableCell>
                    <TableCell>{item.vigencia}</TableCell>
                    <TableCell>{item.servicio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold text-primary">
              PBX: 3369999
            </p>
            <p className="text-sm text-muted-foreground">
              Clínica de la Costa S.A.S Nit: 800129856-5 / Carrera 50 #80 – 90 / Barranquilla – Colombia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
