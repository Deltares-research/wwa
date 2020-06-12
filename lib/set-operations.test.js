import test from 'ava';
import { intersect, intersectByProp, union } from './set-operations';

const simpleA = [ 1, 2, 3 ];
const simpleB = [ 2, 3, 4 ];
const simpleIntersect = [ 2, 3 ];
const simpleUnion = [ 1, 2, 3, 4 ];
const objectsA = [ { a: 1 }, { a: 2 }, { a: 3 } ];
const objectsB = [ { a: 2 }, { a: 3 }, { a: 4 } ];
const objectsIntersect = [ { a: 2 }, { a: 3 } ];
const objectsUnion = [ { a: 1 }, { a: 2 }, { a: 3 }, { a: 4 } ];

test('intersect of simple arrays', t => {
  t.deepEqual(intersect(simpleA, simpleB), simpleIntersect);
});

test('intersect of object arrays', t => {
  t.deepEqual(intersect(objectsA, objectsB), objectsIntersect);
});

test('intersectByProp of object arrays', t => {
  t.deepEqual(intersectByProp(objectsA, objectsB, 'a'), objectsIntersect);
});

test('union of simple arrays', t => {
  t.deepEqual(union(simpleA, simpleB), simpleUnion);
});

test('union of object arrays', t => {
  t.deepEqual(union(objectsA, objectsB), objectsUnion);
});

test('unionByProp of object arrays', t => {
  t.deepEqual(union(objectsA, objectsB, 'a'), objectsUnion);
});
