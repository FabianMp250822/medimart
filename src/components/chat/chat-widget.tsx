"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { supportFlow } from "@/ai/flows/support-flow";
import ReactMarkdown from "react-markdown";

interface Message {
    role: 'user' | 'model';
    content: { text: string }[];
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsLoading(true);
            // Start the conversation with a greeting from the model
            supportFlow({ history: [] }).then((response) => {
                setMessages([{ role: 'model', content: [{ text: response }] }]);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [isOpen]);

     useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: [{ text: input }] };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsLoading(true);

        try {
            const response = await supportFlow({ history: newMessages });
            setMessages(prev => [...prev, { role: 'model', content: [{ text: response }] }]);
        } catch (error) {
            console.error("Error calling support flow:", error);
            const errorMessage: Message = { role: 'model', content: [{ text: "Lo siento, ocurrió un error. Por favor, intenta de nuevo." }] };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300", { "translate-y-20 opacity-0": isOpen })}>
                <Button onClick={() => setIsOpen(true)} size="lg" className="rounded-full h-16 w-16 shadow-lg bg-accent hover:bg-accent/90">
                    <MessageSquare className="h-8 w-8" />
                </Button>
            </div>
            <div className={cn("fixed bottom-4 right-4 z-50 w-full max-w-sm transition-all duration-300", { "opacity-0 translate-y-10 pointer-events-none": !isOpen })}>
                <Card className="h-[60vh] flex flex-col shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4">
                        <div className="flex items-center gap-3">
                            <Bot className="h-7 w-7" />
                            <div>
                                <CardTitle className="text-lg">CostaBot</CardTitle>
                                <CardDescription className="text-primary-foreground/80">Asistente Virtual</CardDescription>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={cn("flex items-end gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        {msg.role === 'model' && <Avatar className="h-8 w-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>}
                                        <div className={cn("max-w-[80%] rounded-lg px-3 py-2 text-sm break-words", msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                             <ReactMarkdown className="prose prose-sm">{msg.content[0].text}</ReactMarkdown>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                     <div className="flex items-end gap-2 justify-start">
                                        <Avatar className="h-8 w-8"><AvatarFallback><Bot/></AvatarFallback></Avatar>
                                        <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                                            <Loader2 className="h-4 w-4 animate-spin"/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="w-full flex items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                disabled={isLoading}
                                autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

const Avatar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
);

const AvatarFallback = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
);
