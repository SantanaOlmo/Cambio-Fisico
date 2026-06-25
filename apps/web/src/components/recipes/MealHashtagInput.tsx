import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Recipe, recipeMatchesQuery } from '../../types/recipe';
import { useEntries } from '../../hooks/useEntries';


interface MealHashtagInputProps {
  value: string | null;
  onChange: (value: string | null) => void;
  recipes: Recipe[];
  placeholder?: string;
  id?: string;
  rows?: number;
}

interface HashtagMatch {
  query: string;
  hashStart: number;
  wordEnd: number;
}

/**
 * Calculates Caret/Character pixel coordinates inside a textarea.
 */
function getCaretCoordinates(textarea: HTMLTextAreaElement, position: number): { top: number; left: number } {
  const properties = [
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',
    'letterSpacing',
    'wordSpacing'
  ];

  const div = document.createElement('div');
  div.id = 'input-textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  const style = div.style;
  const computed = window.getComputedStyle(textarea);

  style.whiteSpace = 'pre-wrap';
  style.wordBreak = 'break-word';
  style.position = 'absolute';
  style.visibility = 'hidden';

  properties.forEach((prop) => {
    style[prop as any] = computed[prop as any];
  });

  div.textContent = textarea.value.substring(0, position);

  const span = document.createElement('span');
  span.textContent = textarea.value.substring(position, position + 1) || '.';
  div.appendChild(span);

  const coordinates = {
    top: span.offsetTop - textarea.scrollTop,
    left: span.offsetLeft - textarea.scrollLeft
  };

  document.body.removeChild(div);

  return coordinates;
}

function detectHashtag(text: string, cursorPos: number): HashtagMatch | null {
  let i = cursorPos - 1;
  while (i >= 0 && !/\s/.test(text[i])) {
    if (text[i] === '#') {
      const query = text.slice(i + 1, cursorPos);
      let wordEnd = cursorPos;
      while (wordEnd < text.length && !/\s/.test(text[wordEnd])) wordEnd++;
      return { query, hashStart: i, wordEnd };
    }
    i--;
  }
  return null;
}

function replaceHashtag(text: string, hashStart: number, wordEnd: number, slug: string): string {
  return text.slice(0, hashStart) + '#' + slug + text.slice(wordEnd);
}

export function MealHashtagInput({
  value,
  onChange,
  recipes,
  placeholder = 'Describe lo que comiste… Escribe # para vincular una receta',
  id,
  rows = 2,
}: MealHashtagInputProps) {
  const [hashtag, setHashtag] = useState<HashtagMatch | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { entries } = useEntries();
  const text = value ?? '';

  // Extract all unique custom hashtags from other entries
  const allCustomHashtags = useMemo(() => {
    const hashtagsSet = new Set<string>();
    const regex = /(#[a-z0-9-ñáéíóúü]+)/gi;

    entries.forEach((entry) => {
      ['meal_breakfast', 'meal_lunch', 'meal_dinner', 'meal_other'].forEach((key) => {
        const val = entry[key as keyof typeof entry];
        if (typeof val === 'string') {
          regex.lastIndex = 0;
          let match;
          while ((match = regex.exec(val)) !== null) {
            const hashtagStr = match[0].slice(1).toLowerCase();
            if (hashtagStr) {
              hashtagsSet.add(hashtagStr);
            }
          }
        }
      });
    });

    return Array.from(hashtagsSet);
  }, [entries]);

  interface SuggestionOption {
    type: 'recipe' | 'custom';
    slug: string;
    name?: string;
    tags?: string;
    recipeId?: number;
  }

  const suggestions = useMemo((): SuggestionOption[] => {
    if (!hashtag) return [];

    const q = hashtag.query.toLowerCase();

    // 1. Filter matching recipes
    const matchingRecipes = recipes.filter((r) => recipeMatchesQuery(r, hashtag.query));

    // 2. Filter matching custom hashtags that are not already in recipes
    const matchingCustom = allCustomHashtags.filter((slug) => {
      const matches = slug.toLowerCase().includes(q);
      const isRecipe = recipes.some((r) => r.slug.toLowerCase() === slug.toLowerCase());
      return matches && !isRecipe;
    });

    // 3. Combine them, showing recipes first, capped at 8 total
    return [
      ...matchingRecipes.map((r) => ({
        type: 'recipe' as const,
        slug: r.slug,
        name: r.name,
        tags: r.tags,
        recipeId: r.id,
      })),
      ...matchingCustom.map((slug) => ({
        type: 'custom' as const,
        slug,
      })),
    ].slice(0, 8);
  }, [hashtag, recipes, allCustomHashtags]);

  const showDropdown = dropdownOpen && hashtag !== null && suggestions.length > 0;

  // Recalculates and positions the dropdown below the typed hashtag `#` symbol
  const updateDropdownPosition = useCallback((targetText: string, cursorIndex: number) => {
    if (!textareaRef.current) return;
    const match = detectHashtag(targetText, cursorIndex);
    if (match) {
      const caretCoords = getCaretCoordinates(textareaRef.current, match.hashStart);
      setCoords(caretCoords);
    }
  }, []);

  // Sync scroll function between textarea and overlay
  const handleScroll = useCallback(() => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  // Sync scroll on text updates
  useEffect(() => {
    handleScroll();
  }, [text, handleScroll]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    onChange(newText || null);

    const cursor = e.target.selectionStart ?? newText.length;
    const match = detectHashtag(newText, cursor);
    setHashtag(match);
    setDropdownOpen(match !== null);

    if (match) {
      updateDropdownPosition(newText, cursor);
    }
  };

  const selectSuggestion = useCallback(
    (slug: string) => {
      if (!hashtag) return;
      const newText = replaceHashtag(text, hashtag.hashStart, hashtag.wordEnd, slug);
      onChange(newText || null);
      setHashtag(null);
      setDropdownOpen(false);

      const newCursor = hashtag.hashStart + slug.length + 1;
      requestAnimationFrame(() => {
        textareaRef.current?.setSelectionRange(newCursor, newCursor);
        textareaRef.current?.focus();
      });
    },
    [hashtag, text, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!showDropdown) return;
    if (e.key === 'Escape') {
      setDropdownOpen(false);
    } else if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      selectSuggestion(suggestions[0].slug);
    }
  };

  const renderHighlightedText = (val: string) => {
    if (!val) {
      return (
        <span className="text-slate-500 pointer-events-none select-none">
          {placeholder}
        </span>
      );
    }

    // Append space on ending newline to match textarea height/scrolling behaviour
    const displayText = val.endsWith('\n') ? val + ' ' : val;
    const parts = displayText.split(/(#[a-z0-9-ñáéíóúü]+)/gi);

    const renderSlugWithoutHyphens = (s: string) => {
      const slugParts = s.split('-');
      return slugParts.map((p, idx) => (
        <span key={idx}>
          {p}
          {idx < slugParts.length - 1 && (
            <span className="text-transparent select-none">-</span>
          )}
        </span>
      ));
    };

    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        const slug = part.slice(1);
        const exists = recipes.some((r) => r.slug.toLowerCase() === slug.toLowerCase());
        if (exists) {
          return (
            <span key={i} className="relative inline">
              <span className="text-transparent select-none">#</span>
              <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded px-1 ml-[-5px] mr-[-2px] py-0.5 select-none">
                {renderSlugWithoutHyphens(slug)}
              </span>
            </span>
          );
        } else {
          return (
            <span key={i} className="relative inline">
              <span className="text-transparent select-none">#</span>
              <span className="bg-slate-700/60 text-slate-300 border border-slate-600/40 rounded px-1 ml-[-5px] mr-[-2px] py-0.5 select-none">
                {renderSlugWithoutHyphens(slug)}
              </span>
            </span>
          );
        }
      }
      return <span key={i} className="text-slate-100">{part}</span>;
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        className={`relative w-full rounded-xl bg-slate-900/60 border transition-all duration-200 text-sm overflow-hidden
          ${isFocused 
            ? 'border-emerald-500/60 ring-2 ring-emerald-500/40' 
            : 'border-slate-700/80'}`}
      >
        {/* Background Highlight Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none overflow-hidden py-2.5 px-4 text-sm leading-relaxed whitespace-pre-wrap break-words no-scrollbar select-none"
        >
          {renderHighlightedText(text)}
        </div>

        {/* Foreground Transparent Textarea */}
        <textarea
          ref={textareaRef}
          id={id}
          value={text}
          rows={rows}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onClick={(e) => {
            const cursor = (e.target as HTMLTextAreaElement).selectionStart;
            const match = detectHashtag(text, cursor);
            setHashtag(match);
            setDropdownOpen(match !== null);
            if (match) {
              updateDropdownPosition(text, cursor);
            }
          }}
          onKeyUp={(e) => {
            const cursor = (e.target as HTMLTextAreaElement).selectionStart;
            const match = detectHashtag(text, cursor);
            setHashtag(match);
            setDropdownOpen(match !== null);
            if (match) {
              updateDropdownPosition(text, cursor);
            }
          }}
          onScroll={() => {
            handleScroll();
            if (hashtag && textareaRef.current) {
              const cursor = textareaRef.current.selectionStart;
              updateDropdownPosition(text, cursor);
            }
          }}
          className="relative w-full bg-transparent text-transparent caret-emerald-400 resize-none outline-none border-0 focus:ring-0 py-2.5 px-4 text-sm leading-relaxed block no-scrollbar hashtag-textarea"
          spellCheck={false}
        />
      </div>

      {/* Hint */}
      <p className="mt-1 text-xs text-slate-600 flex items-center gap-1">
        <span className="text-slate-500">#</span> para vincular una receta
      </p>

      {/* Recipe and history suggestions dropdown positioned below hashtag symbol */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: `${coords.top + 28}px`,
            left: `${Math.max(4, Math.min(coords.left, (textareaRef.current?.clientWidth || 300) - 264))}px`,
            width: '260px',
          }}
          className="z-50 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in"
        >
          <ul className="max-h-48 overflow-y-auto py-1">
            {suggestions.map((sug, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent textarea blur
                    selectSuggestion(sug.slug);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 transition-colors flex items-center justify-between"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`${sug.type === 'recipe' ? 'text-emerald-400' : 'text-slate-300'} font-medium truncate`}>
                        #{sug.slug}
                      </span>
                      {sug.type === 'recipe' && sug.name && (
                        <span className="text-slate-400 text-xs truncate max-w-[100px]">{sug.name}</span>
                      )}
                    </div>
                    {sug.type === 'recipe' && sug.tags && (
                      <span className="text-slate-600 text-xs mt-0.5 truncate max-w-[160px]">{sug.tags}</span>
                    )}
                  </div>
                  <span className={`text-[9px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded flex-shrink-0 select-none
                    ${sug.type === 'recipe' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-900/60 text-slate-500 border border-slate-800'}`}
                  >
                    {sug.type === 'recipe' ? 'Receta' : 'Historial'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

}
