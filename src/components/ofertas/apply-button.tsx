"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "./apply-modal";
import { OfertaEmpleo } from "@/types/oferta-empleo";
import { FilePlus2 } from "lucide-react";

interface ApplyButtonProps {
    oferta: OfertaEmpleo;
}

export function ApplyButton({ oferta }: ApplyButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} oferta={oferta} />
            <Button onClick={() => setIsModalOpen(true)} className="bg-accent hover:bg-accent/90">
                <FilePlus2 className="mr-2 h-5 w-5" />
                Aplicar ahora
            </Button>
        </>
    )
}
