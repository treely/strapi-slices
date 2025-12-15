import { execSync } from 'child_process';
import esbuild from 'esbuild';

console.log('📝 Generating type declarations...');
execSync('tsc -p tsconfig.build.json', { stdio: 'inherit' });

console.log('📦 Bundling with esbuild...');

// Plugin to rewrite imports to include .js extension for Node ESM compatibility
const esmImportPlugin = {
  name: 'esm-imports-fix',
  setup(build) {
    // Next.js subpath imports
    build.onResolve(
      { filter: /^next\/(head|image|link|navigation|router|dynamic|script)$/ },
      (args) => ({
        path: `${args.path}.js`,
        external: true,
      })
    );

    // Lodash subpath imports (lodash/debounce, lodash/throttle, etc.)
    build.onResolve({ filter: /^lodash\/[a-zA-Z]+$/ }, (args) => ({
      path: `${args.path}.js`,
      external: true,
    }));
  },
};

const commonConfig = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  minify: false,
  target: ['es2020'],
  platform: 'browser' as const,

  // Add "use client" banner for Next.js App Router compatibility
  banner: {
    js: '"use client";',
  },

  jsx: 'automatic' as const,
  jsxImportSource: 'react',

  // Keep imports for tree-shaking
  treeShaking: true,

  // Don't split files
  splitting: false,

  // Important for modern ESM
  supported: {
    'import-meta': true,
  },
};

// ESM build - externalize all packages for tree-shaking in bundlers
await esbuild.build({
  ...commonConfig,
  outfile: 'dist/index.js',
  format: 'esm',
  plugins: [esmImportPlugin],
  packages: 'external' as const,
});

console.log('✅ ESM build complete!');

// CJS build - externalize all packages to avoid bundling issues
await esbuild.build({
  ...commonConfig,
  outfile: 'dist/index.cjs',
  format: 'cjs',
  packages: 'external' as const,
});

console.log('✅ CJS build complete!');
