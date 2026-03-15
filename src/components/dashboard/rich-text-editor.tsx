'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontSize } from '@/lib/tiptap-extensions';
import { EditorToolbar } from './editor-toolbar';
import { useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

export function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Escribe aquí...',
  onImageUpload
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Typography,
      TextStyle,
      Color,
      FontSize,
      ImageExtension.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    immediatelyRender: false,
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      const url = await onImageUpload(file);
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="rounded-md border border-input overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      <EditorToolbar 
        editor={editor} 
        onImageClick={() => fileInputRef.current?.click()} 
      />
      <div className="p-4 min-h-[300px] prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none bg-white">
        <EditorContent editor={editor} />
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
    </div>
  );
}
