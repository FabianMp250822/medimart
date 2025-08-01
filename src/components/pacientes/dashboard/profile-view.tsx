
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "firebase/auth";

interface ProfileViewProps {
  user: User;
}

export function ProfileView({ user }: ProfileViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil del Usuario</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "Usuario"} />
          <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold text-primary">{user.displayName}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm text-muted-foreground mt-2">UID: {user.uid}</p>
        </div>
      </CardContent>
    </Card>
  );
}
