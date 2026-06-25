import { useToastContext } from '../../contexts/ToastContext';
import { ToastNotification } from './ToastNotification';

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
      role="region"
      aria-label="Notificaciones"
    >
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
