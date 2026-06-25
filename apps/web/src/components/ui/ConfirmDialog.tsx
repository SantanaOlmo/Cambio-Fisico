import { Icon } from '../icons';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmar',
  isDestructive = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDestructive ? 'bg-red-500/10' : 'bg-amber-500/10'
          }`}
        >
          <Icon name="alert-triangle" className={`w-5 h-5 ${isDestructive ? 'text-red-400' : 'text-amber-400'}`} />
        </div>
        <p className="text-sm text-slate-300 leading-relaxed pt-1">{message}</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1">
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className={`flex-1 font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 ${
            isDestructive
              ? 'bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-red-500/20'
              : 'btn-primary'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
