import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renderiza un texto en Markdown como HTML.
 * - Usa remark-gfm para que soporte tablas, listas, etc.
 */
export default function MarkdownMessage({ text }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {text}
    </ReactMarkdown>
  );
}
