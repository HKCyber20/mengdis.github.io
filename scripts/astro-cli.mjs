import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const astroPackage = require.resolve('astro/package.json');
const astroCli = join(dirname(astroPackage), 'bin', 'astro.mjs');

process.env.ASTRO_TELEMETRY_DISABLED ??= '1';
process.argv = [process.argv[0], astroCli, ...process.argv.slice(2)];

await import(pathToFileURL(astroCli).href);
