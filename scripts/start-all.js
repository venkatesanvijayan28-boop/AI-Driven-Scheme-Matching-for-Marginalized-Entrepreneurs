import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🚀 Launching SchemeMatch AI (Backend Server + Vite Frontend)...');

const backend = spawn('node', ['server.js'], {
  cwd: path.join(rootDir, 'backend'),
  stdio: 'inherit',
  shell: true
});

const frontend = spawn('npx', ['vite'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
});
