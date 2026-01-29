const { spawn } = require('child_process');

// Tempo limite em milissegundos (5 minutos)
const TIMEOUT_MS = 5 * 60 * 1000;

console.log('🚀 Iniciando servidor Next.js com auto-shutdown em 5 minutos...');

// Executa o comando original 'next dev'
// Usamos 'npm exec next dev' para garantir que usa o binário local
const child = spawn('npm', ['exec', 'next', 'dev'], { 
  stdio: 'inherit', 
  shell: true 
});

// Configura o timer
const timer = setTimeout(() => {
  console.log('\n🛑 Tempo limite de 5 minutos atingido. Encerrando servidor para economizar recursos...');
  
  if (process.platform === 'win32') {
    // No Windows, precisamos matar a árvore de processos
    spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
  } else {
    child.kill('SIGTERM');
  }
  
  process.exit(0);
}, TIMEOUT_MS);

// Se o processo filho morrer antes, cancela o timer
child.on('close', (code) => {
  clearTimeout(timer);
  console.log(`Servidor encerrado (código ${code})`);
  process.exit(code);
});

// Tratamento de encerramento manual (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\nEncerrando servidor manualmente...');
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
  } else {
    child.kill();
  }
  process.exit(0);
});
