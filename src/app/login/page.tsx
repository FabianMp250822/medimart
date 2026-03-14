'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!auth) throw new Error('Auth not initialized');
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: '¡Bienvenido de nuevo!',
        description: 'Has iniciado sesión correctamente.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error de inicio de sesión',
        description: error.message || 'Verifica tus credenciales e intenta de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden px-4">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      
      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl relative z-10 transition-all duration-500 hover:border-white/20">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <Link href="/" className="transition-transform hover:scale-110">
               <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase">
                 Clínica de la Costa
               </span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-white/60">
            Ingresa tus credenciales para acceder al panel profesional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white/80">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@clinicadelacosta.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-white/80">Contraseña</Label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all py-6 text-lg font-semibold mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center flex-wrap gap-2 text-sm text-white/40 pt-2 pb-6">
          ¿No tienes cuenta?{' '}
          <Link href="/contacto" className="text-primary hover:underline font-medium">
            Contactar soporte
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
