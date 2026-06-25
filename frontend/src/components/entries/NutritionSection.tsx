import React, { useState } from 'react';
import { Icon } from '../icons';
import { EntryFormData } from '../../types/entry';
import { FormErrors } from '../../utils/validators';
import { FormSection } from './FormSection';
import { MealHashtagInput } from '../recipes/MealHashtagInput';
import { useRecipes } from '../../hooks/useRecipes';

interface NutritionSectionProps {
  formData: EntryFormData;
  setField: <K extends keyof EntryFormData>(field: K, value: EntryFormData[K]) => void;
  errors: FormErrors;
}

export function NutritionSection({ formData, setField }: NutritionSectionProps) {
  const { recipes } = useRecipes();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    meal_breakfast: true,
    meal_lunch: false,
    meal_dinner: false,
    meal_other: false,
  });

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const MEALS = [
    {
      key: 'meal_breakfast' as const,
      label: 'Desayuno',
      iconName: 'coffee' as const,
      placeholder: 'Desayuno: avena, plátano, café...',
    },
    {
      key: 'meal_lunch' as const,
      label: 'Almuerzo',
      iconName: 'utensils' as const,
      placeholder: 'Almuerzo: pollo con arroz, ensalada...',
    },
    {
      key: 'meal_dinner' as const,
      label: 'Cena',
      iconName: 'salad' as const,
      placeholder: 'Cena: tortilla francesa, aguacate, yogur...',
    },
    {
      key: 'meal_other' as const,
      label: 'Otro / Snacks',
      iconName: 'apple' as const,
      placeholder: 'Snacks: frutos secos, batido de proteínas...',
    },
  ];

  return (
    <FormSection title="Nutrición" icon={<Icon name="salad" className="w-4 h-4" />}>
      <div className="space-y-3">
        {MEALS.map(({ key, label, iconName, placeholder }) => {
          const isExpanded = expanded[key];
          const value = formData[key];
          const hasValue = !!value;

          return (
            <div
              key={key}
              className={`border border-slate-700/60 rounded-xl transition-all duration-200 ${
                isExpanded
                  ? 'bg-slate-850/60 border-slate-750'
                  : 'bg-slate-800/10 hover:bg-slate-800/20'
              }`}
            >
              {/* Header / Trigger */}
              <button
                type="button"
                onClick={() => toggle(key)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none rounded-t-xl ${
                  !isExpanded ? 'rounded-b-xl' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg border ${
                      isExpanded
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700/30 border-slate-650/30 text-slate-400'
                    }`}
                  >
                    <Icon name={iconName} className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-200">{label}</span>
                    {!isExpanded && hasValue && (
                      <span className="text-xs text-slate-500 ml-2 truncate max-w-[240px] inline-block align-bottom">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
                <Icon name="chevron-down" className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-emerald-400' : ''
                  }`} />
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-700/30 bg-slate-900/10 rounded-b-xl">
                  <MealHashtagInput
                    id={key}
                    value={value}
                    onChange={(val) => setField(key, val)}
                    recipes={recipes}
                    placeholder={placeholder}
                    rows={3}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
