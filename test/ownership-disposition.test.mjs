import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = join(fileURLToPath(new URL('..', import.meta.url)));

test('keeps the retained maintenance disposition prominent', () => {
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const ownership = readFileSync(join(root, 'OWNERSHIP.md'), 'utf8');

  assert.match(readme, /Disposition: retained maintenance surface/);
  assert.match(ownership, /Disposition: retained maintenance surface/);
  assert.match(ownership, /unverified release\/rollback boundary/);
});

test('keeps the retained production deployment bound to main', () => {
  const workflow = readFileSync(join(root, '.github/workflows/deploy.yml'), 'utf8');

  assert.match(workflow, /push:\s*\n\s*branches:\s*\n\s*- main/);
  assert.match(workflow, /aws s3 sync build\/client\//);
  assert.match(workflow, /aws cloudfront create-invalidation/);
});
