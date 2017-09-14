"use strict";
const KoaGeneratorServer = require('./generatorServer');
const debug = require('debug')(`KoaGeneratorServer:LLS test: `);
const app = new KoaGeneratorServer('KoaGeneratorServer');

app.use(function *(next) {
  debug('this first middleware exec start!');
  yield next;
  debug('this first middleware exec end!');
});

app.use(function *(next) {
  debug('this second middleware exec start!');
  yield next;
  debug('this second middleware exec end!');
});

app.use(function *(next) {
  debug('this third middleware exec start!');
  yield next;
  debug('this third middleware exec end!');
});

app.use(function *(next) {
  debug('this fourth middleware exec start!');
  debug('================ four content not next! ==================');
  debug('this fourth middleware exec end!');
});

app.run();


