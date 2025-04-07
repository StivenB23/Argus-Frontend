import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export const __dirname: string = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
