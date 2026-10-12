import {spawnSync} from 'node:child_process';
import {cpSync, mkdirSync, rmSync} from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
if (!target) throw new Error('Usage: node scripts/export-github.mjs ../blog');
const output = path.resolve(target);
if (output === process.cwd() || path.basename(output) !== 'blog') {
  throw new Error('Export destination must be a separate directory named blog.');
}
const env = {...process.env, SITE_BASE_URL: 'https://lilanovo.github.io/blog/'};
for (const [program, args] of [['node', ['scripts/build.mjs']], ['node', ['--check', 'static/js/site.js']], ['python3', ['scripts/check_links.py']]]) {
  const result = spawnSync(program, args, {stdio: 'inherit', env});
  if (result.status !== 0) process.exit(result.status ?? 1);
}
rmSync(output, {recursive: true, force: true});
mkdirSync(output, {recursive: true});
cpSync('dist', output, {recursive: true});
console.log(`Published files prepared at ${output}`);
