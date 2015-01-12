'use strict';

var mongojs = require('mongojs');
var test = require('tape');
var flatten = require('./');

var obj = {
  number: 1,
  string: 'foo',
  bool: true,
  arr1: [1,2,3],
  arr2: [{ foo: 1 }, { bar: 2 }],
  sub: { foo: 1, bar: { baz: 3 } }
};

test('only flatten nested objects', function (t) {
  t.deepEqual(flatten(obj), {
    number: 1,
    string: 'foo',
    bool: true,
    arr1: [1,2,3],
    arr2: [{ foo: 1 }, { bar: 2 }],
    'sub.foo': 1,
    'sub.bar.baz': 3
  });
  t.end();
});

test('should not traverse into a MongoDB ObjectId', function (t) {
  var id = mongojs.ObjectId();
  t.deepEqual(flatten({ id: id }), { id: id });
  t.end();
});
