import { useState, useCallback } from 'react';

const STORAGE_PREFIX = 'cambiofisico_opts_';

/**
 * Manages a list of options combining fixed base options with
 * user-defined custom options stored in localStorage.
 */
export function useCustomOptions(storageKey: string, baseOptions: readonly string[]) {
  const fullKey = `${STORAGE_PREFIX}${storageKey}`;

  const loadCustom = (): string[] => {
    if (!storageKey) return [];
    try {
      const raw = localStorage.getItem(fullKey);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  };

  const [custom, setCustom] = useState<string[]>(loadCustom);

  // Merge: base first, then custom ones not already in base
  const options = [
    ...baseOptions,
    ...custom.filter((c) => !baseOptions.some((b) => b.toLowerCase() === c.toLowerCase())),
  ];

  const addOption = useCallback(
    (value: string) => {
      if (!value.trim() || !storageKey) return;
      // Skip if already known (case-insensitive)
      if (options.some((o) => o.toLowerCase() === value.toLowerCase())) return;

      setCustom((prev) => {
        const next = [...prev.filter((p) => p.toLowerCase() !== value.toLowerCase()), value];
        try {
          localStorage.setItem(fullKey, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [fullKey, options, storageKey],
  );

  return { options, addOption };
}
