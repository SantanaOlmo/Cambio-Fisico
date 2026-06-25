import app from './src/app';
import { PORT } from './src/config';
import { initializeDatabase, closeDatabase } from './src/db/database';

async function start(): Promise<void> {
  await initializeDatabase();

  const server = app.listen(PORT, () => {
    console.log('');
    console.log('🏋️  CambioFísico — Servidor local iniciado');
    console.log(`   API:    http://localhost:${PORT}/api`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log('   Datos:  ../data/fitness.sqlite');
    console.log('');
  });

  const shutdown = (): void => {
    server.close(() => {
      closeDatabase();
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

start().catch((err) => {
  console.error('Error fatal al iniciar el servidor:', err);
  process.exit(1);
});
