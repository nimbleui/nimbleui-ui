'use strict';

const eslintConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(eslintConfig(), 'Hello from eslintConfig');
console.info("eslintConfig tests passed");
