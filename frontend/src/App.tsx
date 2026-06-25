import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import { AppLayout } from './components/layout/AppLayout';
import { ToastContainer } from './components/ui/ToastContainer';
import { DashboardPage } from './pages/DashboardPage';
import { NewEntryPage } from './pages/NewEntryPage';
import { EditEntryPage } from './pages/EditEntryPage';
import { HistoryPage } from './pages/HistoryPage';
import { EntryDetailPage } from './pages/EntryDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ExportPage } from './pages/ExportPage';
import { RecipesPage } from './pages/RecipesPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { EditRecipePage } from './pages/EditRecipePage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/nueva-entrada" element={<NewEntryPage />} />
            <Route path="/historial" element={<HistoryPage />} />
            <Route path="/entradas/:id" element={<EntryDetailPage />} />
            <Route path="/entradas/:id/editar" element={<EditEntryPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/exportar" element={<ExportPage />} />
            <Route path="/recetas" element={<RecipesPage />} />
            <Route path="/recetas/nueva" element={<NewRecipePage />} />
            <Route path="/recetas/:id" element={<RecipeDetailPage />} />
            <Route path="/recetas/:id/editar" element={<EditRecipePage />} />
          </Routes>
        </AppLayout>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  );
}
