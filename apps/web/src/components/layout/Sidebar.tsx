import { Icon } from '../icons';
import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: 'layout-dashboard', label: 'Stats', end: true },
  { to: '/recetas', icon: 'chef-hat', label: 'Recetas' },
  { to: '/historial', icon: 'list', label: 'Días' },
  { to: '/galeria', icon: 'image', label: 'Galería' },
  { to: '/exportar', icon: 'download', label: 'Exportar' },
];

interface SidebarProps {
  daysRegistered: number;
}

export function Sidebar({ daysRegistered }: SidebarProps) {
  const progress = Math.min(Math.round((daysRegistered / 90) * 100), 100);

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-slate-900/95 border-r border-slate-800 flex flex-col z-20 backdrop-blur-sm">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Icon name="dumbbell" className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm tracking-tight">CambioFísico</h1>
            <p className="text-xs text-slate-500">90 días · Recomp</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ to, icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`
            }
          >
            <Icon name={icon as any} className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Progress footer */}
      <div className="px-4 pb-5 border-t border-slate-800 pt-4">
        <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Icon name="flame" className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs text-slate-400 font-medium">Progreso</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500">
            <span className="text-slate-300 font-semibold">{daysRegistered}</span> de 90 días
          </p>
        </div>
      </div>
    </aside>
  );
}
