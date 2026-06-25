import { Icon } from '../icons';
import { ToastItem } from '../../hooks/useToast';

interface ToastNotificationProps {
  toast: ToastItem;
  onRemove: (id: string) => void;
}

const CONFIG = {
  success: {
    iconName: 'check-circle' as const,
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    icon_color: 'text-emerald-400',
    text: 'text-emerald-300',
  },
  error: {
    iconName: 'alert-circle' as const,
    bg: 'bg-red-500/10 border-red-500/30',
    icon_color: 'text-red-400',
    text: 'text-red-300',
  },
  warning: {
    iconName: 'alert-triangle' as const,
    bg: 'bg-amber-500/10 border-amber-500/30',
    icon_color: 'text-amber-400',
    text: 'text-amber-300',
  },
  info: {
    iconName: 'info' as const,
    bg: 'bg-blue-500/10 border-blue-500/30',
    icon_color: 'text-blue-400',
    text: 'text-blue-300',
  },
};

export function ToastNotification({ toast, onRemove }: ToastNotificationProps) {
  const { iconName, bg, icon_color, text } = CONFIG[toast.type];

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${bg} backdrop-blur-sm shadow-xl animate-slide-up min-w-72 max-w-sm`}
    >
      <Icon name={iconName} className={`w-4 h-4 mt-0.5 flex-shrink-0 ${icon_color}`} />
      <p className={`text-sm flex-1 leading-snug ${text}`}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
        aria-label="Cerrar"
      >
        <Icon name="x" className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
