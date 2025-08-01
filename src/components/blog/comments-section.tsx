"use client"

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

interface Comment {
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    text: string;
    timestamp: any;
}

interface CommentsSectionProps {
    blogId: string;
}

const commentSchema = z.object({
    text: z.string().min(3, { message: 'El comentario debe tener al menos 3 caracteres.' }).max(1000),
});

type CommentFormValues = z.infer<typeof commentSchema>;

export function CommentsSection({ blogId }: CommentsSectionProps) {
    const [user, loading] = useAuthState(auth);
    const [comments, setComments] = useState<Comment[]>([]);

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: { text: '' },
    });

    useEffect(() => {
        const commentsRef = collection(db, 'blogs', blogId, 'comments');
        const q = query(commentsRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const commentsData: Comment[] = [];
            for (const docSnap of querySnapshot.docs) {
                const commentData = docSnap.data();
                
                // Fetch user data if not present on comment
                if (!commentData.userName || !commentData.userImage) {
                    const userRef = doc(db, 'users', commentData.userId); // Assuming you have a 'users' collection
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        commentData.userName = userSnap.data().displayName;
                        commentData.userImage = userSnap.data().photoURL;
                    }
                }
                
                commentsData.push({ id: docSnap.id, ...commentData } as Comment);
            }
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, [blogId]);

    const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
        if (!user) return;
        
        const commentsRef = collection(db, 'blogs', blogId, 'comments');
        await addDoc(commentsRef, {
            userId: user.uid,
            userName: user.displayName,
            userImage: user.photoURL,
            text: data.text,
            timestamp: serverTimestamp(),
        });
        form.reset();
    };

    return (
        <Card className="mt-12">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Comentarios ({comments.length})</CardTitle>
            </CardHeader>
            <CardContent>
                {loading && <p>Cargando...</p>}

                {!loading && user ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <Textarea
                                            {...field}
                                            placeholder="Escribe tu comentario..."
                                            rows={4}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="self-end bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Comentario'}
                            </Button>
                        </form>
                    </Form>
                ) : (
                    !loading && (
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-muted-foreground">Debes iniciar sesión para poder comentar.</p>
                            <Button className="mt-4 bg-accent hover:bg-accent/90">Iniciar Sesión</Button>
                        </div>
                    )
                )}

                <Separator className="my-8" />

                <div className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={comment.userImage} alt={comment.userName} />
                                    <AvatarFallback>{comment.userName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-primary">{comment.userName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {comment.timestamp ? new Date(comment.timestamp.toDate()).toLocaleDateString('es-ES') : ''}
                                        </p>
                                    </div>
                                    <p className="mt-1 text-foreground">{comment.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
