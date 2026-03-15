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
  Highlighter,
  Palette,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditorToolbarProps {
  editor: Editor | null;
  onImageClick: () => void;
}

const fontSizes = [
  { label: 'Pequeño', value: '12px' },
  { label: 'Normal', value: '16px' },
  { label: 'Mediano', value: '20px' },
  { label: 'Grande', value: '24px' },
  { label: 'Extra Grande', value: '32px' },
  { label: 'Gigante', value: '48px' },
];

const colors = [
  { name: 'Negro', value: '#000000' },
  { name: 'Gris', value: '#64748b' },
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Naranja', value: '#f59e0b' },
  { name: 'Púrpura', value: '#8b5cf6' },
  { name: 'Rosa', value: '#ec4899' },
];

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

  return (
    <div className="border-b border-input bg-slate-50/50 p-2 flex flex-wrap gap-1 sticky top-0 z-10 items-center">
      <TooltipProvider delayDuration={300}>
        {/* Style Group */}
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-1">
          <Select 
            onValueChange={(value) => editor.chain().focus().setFontSize(value).run()}
            value={editor.getAttributes('textStyle').fontSize || '16px'}
          >
            <SelectTrigger className="h-8 w-[110px] text-xs bg-white border-slate-200">
              <SelectValue placeholder="Tamaño" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size.value} value={size.value} className="text-xs">
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white border hover:border-slate-200">
                <Palette className="h-4 w-4" style={{ color: editor.getAttributes('textStyle').color || 'inherit' }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2 grid grid-cols-4 gap-1 min-w-[120px]">
              <div 
                className="w-6 h-6 rounded border cursor-pointer hover:scale-110 transition-transform bg-transparent relative flex items-center justify-center text-[10px]" 
                onClick={() => editor.chain().focus().unsetColor().run()}
                title="Limpiar color"
              >
                ✕
              </div>
              {colors.map((color) => (
                <div
                  key={color.value}
                  className="w-6 h-6 rounded border cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                  onClick={() => editor.chain().focus().setColor(color.value).run()}
                  title={color.name}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Format Group */}
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-1">
          <ToolbarButton
            icon={Heading1}
            label="Título 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
          />
          <ToolbarButton
            icon={Heading2}
            label="Título 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
          />
          <ToolbarButton
            icon={Bold}
            label="Negrita"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          />
          <ToolbarButton
            icon={Italic}
            label="Cursiva"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          />
          <ToolbarButton
            icon={UnderlineIcon}
            label="Subrayado"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
          />
          <ToolbarButton
            icon={Highlighter}
            label="Resaltar"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive('highlight')}
          />
        </div>

        {/* List & Alignment Group */}
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-1">
          <ToolbarButton
            icon={List}
            label="Lista Viñetas"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
          />
          <ToolbarButton
            icon={ListOrdered}
            label="Lista Numerada"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
          />
          <ToolbarButton
            icon={Quote}
            label="Cita"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
          />
        </div>

        {/* Media Group */}
        <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mr-1">
          <ToolbarButton
            icon={LinkIcon}
            label="Enlace"
            onClick={toggleLink}
            active={editor.isActive('link')}
          />
          <ToolbarButton
            icon={ImageIcon}
            label="Imagen"
            onClick={onImageClick}
          />
          <ToolbarButton
            icon={Code}
            label="Código"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
          />
        </div>

        {/* Navigation Group */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={Undo}
            label="Deshacer"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          />
          <ToolbarButton
            icon={Redo}
            label="Rehacer"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          />
        </div>
      </TooltipProvider>
    </div>
  );
}

function ToolbarButton({ 
  icon: Icon, 
  label, 
  onClick, 
  active, 
  disabled 
}: { 
  icon: any, 
  label: string, 
  onClick: () => void, 
  active?: boolean, 
  disabled?: boolean 
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          disabled={disabled}
          className={cn(
            "h-8 w-8 p-0 hover:bg-white border border-transparent hover:border-slate-200",
            active && "bg-white border-slate-200 text-primary shadow-sm"
          )}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
