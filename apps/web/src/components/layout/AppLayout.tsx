import { Sidebar } from './Sidebar';
import { useEntries } from '../../hooks/useEntries';
import { FloatingActionButton } from '../ui/FloatingActionButton';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { entries } = useEntries();

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar daysRegistered={entries.length} />
      <main className="flex-1 ml-60 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-8">{children}</div>
      </main>
      <FloatingActionButton />
    </div>
  );
}

