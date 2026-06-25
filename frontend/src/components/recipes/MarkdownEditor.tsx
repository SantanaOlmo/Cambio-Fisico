import React, { useState, useRef } from 'react';
import { Icon } from '../icons';
import { MarkdownRenderer } from './MarkdownRenderer';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
}

type EditorTab = 'write' | 'preview';

export function MarkdownEditor({
  value,
  onChange,
  placeholder = '# Mi receta\n\n## Ingredientes\n\n- ...\n\n## Preparación\n\n1. ...',
  minRows = 16,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<EditorTab>('write');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      onChange(content);
      setTab('write');
    };
    reader.readAsText(file, 'UTF-8');
    // Reset so the same file can be re-uploaded
    e.target.value = '';
  };

  return (
    <div className="card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/40">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === 'write'
                ? 'bg-slate-700 text-slate-200'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon name="edit-3" className="w-3 h-3" />
            Escribir
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === 'preview'
                ? 'bg-slate-700 text-slate-200'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon name="eye" className="w-3 h-3" />
            Vista previa
          </button>
        </div>

        <div>
          <input
            ref={fileRef}
            type="file"
            accept=".md,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="md-file-upload"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-300 hover:bg-slate-700/50 transition-all"
            title="Importar fichero .md"
          >
            <Icon name="file-up" className="w-3 h-3" />
            Importar .md
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === 'write' ? (
        <textarea
          id="recipe-content"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          className="w-full bg-transparent px-4 py-3 text-sm text-slate-300 placeholder-slate-600 font-mono leading-relaxed focus:outline-none resize-none"
          spellCheck={false}
        />
      ) : (
        <div className="px-4 py-3 min-h-64">
          {value.trim() ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-slate-600 text-sm italic">
              Sin contenido todavía. Escribe algo en la pestaña &ldquo;Escribir&rdquo;.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
