interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function FormSection({ title, icon, children }: FormSectionProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-slate-700/50">
        <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
          {icon}
        </div>
        <h3 className="section-title">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
