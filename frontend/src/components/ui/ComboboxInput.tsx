import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '../icons';
import { useCustomOptions } from '../../hooks/useCustomOptions';

interface ComboboxInputProps {
  value: string | null;
  onChange: (value: string | null) => void;
  baseOptions: readonly string[];
  /** localStorage key — if omitted, custom options are not persisted */
  storageKey?: string;
  placeholder?: string;
  id?: string;
}

export function ComboboxInput({
  value,
  onChange,
  baseOptions,
  storageKey = '',
  placeholder = 'Escribe o busca…',
  id,
}: ComboboxInputProps) {
  const [inputValue, setInputValue] = useState(value ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const { options, addOption } = useCustomOptions(storageKey, baseOptions);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value → input
  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  const filtered = options.filter(
    (o) => o.toLowerCase().includes(inputValue.toLowerCase()) && o !== inputValue,
  );

  const isCustomValue = inputValue.trim() !== '' &&
    !options.some((o) => o.toLowerCase() === inputValue.toLowerCase());

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
      // Persist & commit custom value on blur
      if (inputValue.trim() && isCustomValue && storageKey) {
        addOption(inputValue.trim());
      }
      onChange(inputValue.trim() || null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [inputValue, isCustomValue, storageKey, addOption, onChange]);

  const handleSelect = useCallback(
    (opt: string) => {
      setInputValue(opt);
      onChange(opt);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0) {
        handleSelect(filtered[0]);
      } else if (inputValue.trim()) {
        if (storageKey) addOption(inputValue.trim());
        onChange(inputValue.trim());
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange(null);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && (filtered.length > 0 || isCustomValue);

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        className={`input-field pr-16 ${isOpen ? 'ring-2 ring-emerald-500/40 border-emerald-500/60' : ''}`}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value || null);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        aria-haspopup="listbox"
      />

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Limpiar"
        >
          <Icon name="x" className="w-3.5 h-3.5" />
        </button>
      )}

      <Icon name="chevron-down" className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 transition-transform duration-150 ${
          isOpen ? 'rotate-180' : ''
        }`} />

      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in"
          role="listbox"
        >
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map((opt) => (
              <li key={opt} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
                >
                  {opt}
                </button>
              </li>
            ))}

            {isCustomValue && (
              <li role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => {
                    if (storageKey) addOption(inputValue.trim());
                    onChange(inputValue.trim());
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-emerald-400 hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="text-xs bg-emerald-500/15 border border-emerald-500/25 px-1.5 py-0.5 rounded-full font-medium">
                    Guardar
                  </span>
                  &ldquo;{inputValue.trim()}&rdquo;
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
