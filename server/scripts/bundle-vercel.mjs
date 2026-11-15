// Bundles the compiled Nest app into api/index.js for Vercel (run after `nest build`).
// Vercel's Node loader cannot require() Nest's ESM-only packages from CommonJS deps, so everything is bundled into one ESM file.
import { build } from 'esbuild';

await build({
  entryPoints: ['dist/vercel.js'],
  outfile: 'api/index.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  sourcemap: false,
  logLevel: 'warning',
  banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
  // Native or optional packages stay external and are resolved from node_modules at runtime.
  external: ['@prisma/client', '.prisma/client', 'bcrypt', '@nestjs/microservices', '@nestjs/websockets', '@nestjs/platform-socket.io', '@nestjs/platform-fastify', 'class-transformer/storage', 'cache-manager', '@fastify/static', '@fastify/view'],
});
console.log('Bundled api/index.js');
