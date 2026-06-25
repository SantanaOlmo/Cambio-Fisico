import { useNavigate } from 'react-router-dom';
import { Icon } from '../icons';
export function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <button
      id="fab-nueva-entrada"
      onClick={() => navigate('/nueva-entrada')}
      aria-label="Nueva entrada"
      className="
        group fixed bottom-7 right-7 z-40
        flex items-center gap-0 overflow-hidden
        h-14 w-14 hover:w-auto hover:px-5
        bg-emerald-500 hover:bg-emerald-400
        text-white rounded-full shadow-xl shadow-emerald-500/30
        hover:shadow-emerald-400/40
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-emerald-500/40
      "
    >
      {/* + icon — always visible, stays centered when collapsed */}
      <Icon name="plus" className="w-6 h-6 flex-shrink-0 mx-auto group-hover:mx-0 transition-all duration-300" />

      {/* Label — slides in on hover */}
      <span className="
        whitespace-nowrap font-semibold text-sm
        max-w-0 group-hover:max-w-xs
        opacity-0 group-hover:opacity-100
        overflow-hidden ml-0 group-hover:ml-2
        transition-all duration-300 ease-out
      ">
        Nueva entrada
      </span>
    </button>
  );
}
