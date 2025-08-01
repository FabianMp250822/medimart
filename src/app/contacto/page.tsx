import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contacto/contact-form";
import { Mail, Phone, Users, Stethoscope, Briefcase, Shield, FileText, Building, MessageSquare, PhoneCall } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Contacto - Clínica de la Costa',
  description: 'Ponte en contacto con nosotros. Encuentra nuestros números de teléfono, correos electrónicos y direcciones, o envíanos un mensaje a través de nuestro formulario de contacto.',
};

const contactDetails = [
  {
    category: "Atención al Paciente",
    icon: <Users className="h-8 w-8 text-accent" />,
    contacts: [
      { title: "Admisiones", phone: "3369999 ext: 101", email: "admisiones@clinicadelacosta.co" },
      { title: "Trabajo Social", phone: "3369999 ext: 112", email: "trabajosocial@clinicadelacosta.co" },
      { title: "Call Center", phone: "3369999 ext: 1", email: "citasmedicas@clinicadelacosta.co" },
    ]
  },
  {
    category: "Servicios Médicos",
    icon: <Stethoscope className="h-8 w-8 text-accent" />,
    contacts: [
      { title: "Resonancia", phone: "3369999 ext: 137", email: "resonancia@clinicadelacosta.co" },
      { title: "Neurofisiología", phone: "3369999 ext: 110", email: "neurofisiologia@clinicadelacosta.co" },
      { title: "Patología", phone: "3369999 ext: 203", email: "patologia@clinicadelacosta.co" },
      { title: "Cirugía", phone: "3369999 ext: 106", email: "enfermeriacirugia@clinicadelacosta.co" },
    ]
  },
  {
    category: "Administrativo y Legal",
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    contacts: [
      { title: "Contrataciones", phone: "3369999 ext: 573", email: "contratacion@clinicadelacosta.co" },
      { title: "Notificaciones Judiciales", email: "info@clinicadelacosta.co", email2: "juridica@clinicadelacosta.co" },
    ]
  }
];

const ContactInfoCard = ({ contact }: { contact: any }) => (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="text-lg text-primary">{contact.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 text-sm">
            {contact.phone && (
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <Link href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-foreground hover:underline">{contact.phone}</Link>
                </div>
            )}
            {contact.email && (
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" />
                    <Link href={`mailto:${contact.email}`} className="text-foreground hover:underline truncate">{contact.email}</Link>
                </div>
            )}
             {contact.email2 && (
                 <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent" />
                    <Link href={`mailto:${contact.email2}`} className="text-foreground hover:underline truncate">{contact.email2}</Link>
                </div>
            )}
        </CardContent>
    </Card>
);

export default function ContactoPage() {
  return (
    <div className="space-y-16">
      <section>
        {contactDetails.map((category, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              {category.icon}
              <h2 className="text-2xl md:text-3xl font-bold text-primary">{category.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.contacts.map((contact, contactIndex) => (
                <ContactInfoCard key={contactIndex} contact={contact} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-card p-8 rounded-lg shadow-lg">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary">¿Tienes alguna pregunta?</h2>
            <p className="text-muted-foreground mt-2">Envíanos un mensaje y te responderemos a la brevedad.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ContactForm />
            </div>
            <div className="relative h-96 w-full hidden lg:block">
                <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Fcontacto.webp?alt=media&token=c191a56f-124b-4835-9610-d8b4e4af34fa" 
                    alt="Personal de la clínica atendiendo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                    data-ai-hint="clinic staff"
                />
            </div>
        </div>
      </section>
    </div>
  );
}
