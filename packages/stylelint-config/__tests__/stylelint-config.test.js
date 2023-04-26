'use strict';

const stylelintConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(stylelintConfig(), 'Hello from stylelintConfig');
console.info("stylelintConfig tests passed");
