import test from 'node:test';
import assert from 'node:assert/strict';
import { checkQuantity, MAX_PER_MEAL } from '../src/rules/quantityRule.js';

test('accepts an ordinary quantity', () => {
  const result = checkQuantity(3, 10);
  assert.equal(result.valid, true);
  assert.equal(result.message, '');
});

test('accepts exactly the limit of six', () => {
  assert.equal(MAX_PER_MEAL, 6);
  const result = checkQuantity(6, 10);
  assert.equal(result.valid, true);
});

test('rejects seven, one above the limit', () => {
  const result = checkQuantity(7, 10);
  assert.equal(result.valid, false);
  assert.equal(result.message, 'Maximum 6 per meal in one order.');
});

test('rejects a quantity above the remaining stock', () => {
  const result = checkQuantity(5, 4);
  assert.equal(result.valid, false);
  assert.equal(result.message, 'Only 4 left.');
  assert.equal(result.max, 4);
});

test('rejects zero and sold-out items', () => {
  assert.equal(checkQuantity(0, 10).message, 'Minimum quantity is 1.');
  assert.equal(checkQuantity(1, 0).message, 'Sold out right now.');
});
