'use client';

import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Code, 
  Heading1, 
  Heading2, 
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  editor: Editor | null;
  onImageClick: () => void;
}

export function EditorToolbar({ editor, onImageClick }: EditorToolbarProps) {
  if (!editor) return null;

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const buttons = [
    { 
      icon: Heading1, 
      label: 'Título 1', 
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive('heading', { level: 1 })
    },
    { 
      icon: Heading2, 
      label: 'Título 2', 
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive('heading', { level: 2 })
    },
    { 
      icon: Bold, 
      label: 'Negrita', 
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold')
    },
    { 
      icon: Italic, 
      label: 'Cursiva', 
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic')
    },
    { 
      icon: UnderlineIcon, 
      label: 'Subrayado', 
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline')
    },
    { 
      icon: Highlighter, 
      label: 'Resaltar', 
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive('highlight')
    },
    { 
      icon: List, 
      label: 'Lista Viñetas', 
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList')
    },
    { 
      icon: ListOrdered, 
      label: 'Lista Numerada', 
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList')
    },
    { 
      icon: Quote, 
      label: 'Cita', 
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive('blockquote')
    },
    { 
      icon: LinkIcon, 
      label: 'Enlace', 
      onClick: toggleLink,
      active: editor.isActive('link')
    },
    { 
      icon: ImageIcon, 
      label: 'Imagen', 
      onClick: onImageClick,
      active: false
    },
    { 
      icon: Code, 
      label: 'Código', 
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive('codeBlock')
    },
    { 
      icon: Undo, 
      label: 'Deshacer', 
      onClick: () => editor.chain().focus().undo().run(),
      active: false,
      disabled: !editor.can().undo()
    },
    { 
      icon: Redo, 
      label: 'Rehacer', 
      onClick: () => editor.chain().focus().redo().run(),
      active: false,
      disabled: !editor.can().redo()
    },
  ];

  return (
    <div className="border border-input bg-background rounded-t-md p-1 flex flex-wrap gap-1 sticky top-0 z-10">
      <TooltipProvider delayDuration={300}>
        {buttons.map((btn, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={btn.onClick}
                disabled={btn.disabled}
                className={cn(
                  "h-8 w-8 p-0",
                  btn.active && "bg-muted text-primary font-bold"
                )}
              >
                <btn.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{btn.label}</TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
