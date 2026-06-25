import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../components/icons';
import { api } from '../api/client';
import { useToastContext } from '../contexts/ToastContext';
import { generateSlug } from '../types/recipe';
import { FormField } from '../components/ui/FormField';
import { MarkdownEditor } from '../components/recipes/MarkdownEditor';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function NewRecipePage() {
  const navigate = useNavigate();
  const { toast } = useToastContext();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isSlugManual, setIsSlugManual] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugManual) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val.toLowerCase().replace(/[^a-z0-9-]/g, ''));
    setIsSlugManual(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'El nombre es obligatorio';
    if (!slug.trim()) errs.slug = 'El slug es obligatorio';
    if (!content.trim()) errs.content = 'El contenido de la receta es obligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(false);
    try {
      setIsLoading(true);
      await api.post('/recipes', {
        name: name.trim(),
        slug: slug.trim(),
        tags: tags.trim(),
        content: content.trim(),
      });
      toast.success('Receta creada con éxito');
      navigate('/recetas');
    } catch (err: any) {
      toast.error(err.message || 'Error al guardar la receta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div>
        <Link
          to="/recetas"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 font-medium transition-colors"
        >
          <Icon name="arrow-left" className="w-3.5 h-3.5" />
          Volver al recetario
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
          <Icon name="chef-hat" className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Nueva Receta</h1>
          <p className="text-xs text-slate-400">
            Define los ingredientes, preparación e importa ficheros .md.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content: Editor */}
        <div className="lg:col-span-2 space-y-4">
          <FormField label="Contenido de la receta (Markdown)" htmlFor="recipe-content" error={errors.content}>
            <MarkdownEditor value={content} onChange={setContent} />
          </FormField>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-4">
          <div className="card p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 border-b border-slate-700/50 pb-2 mb-1">
              Detalles
            </h2>

            <FormField label="Nombre de la receta" htmlFor="name" error={errors.name}>
              <input
                id="name"
                type="text"
                placeholder="Pollo al curry"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="input-field"
              />
            </FormField>

            <FormField
              label="Hashtag / Slug"
              htmlFor="slug"
              error={errors.slug}
              hint="Se usará como #pollo-al-curry en las comidas"
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                  #
                </span>
                <input
                  id="slug"
                  type="text"
                  placeholder="pollo-al-curry"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  className="input-field pl-7 font-mono text-sm"
                />
              </div>
            </FormField>

            <FormField
              label="Etiquetas (tags)"
              htmlFor="tags"
              hint="Separadas por comas (ej. proteínas, cena, fácil)"
            >
              <input
                id="tags"
                type="text"
                placeholder="proteínas, almuerzo, pollo"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="input-field"
              />
            </FormField>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Receta'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
