"use strict";
require('babel-core/register');
const KoaAsyncServer     = require('./asyncServer');
const debug = require('debug')(`KoaAsyncServer:LLS test`);
const app = new KoaAsyncServer('KoaAsyncServer');

app.use(async function (context, next) {
  debug('this first middleware exec start!');
  await next();
  debug('this first middleware exec end!');
});

app.use(async function (context, next) {
  debug('this second middleware exec start!');
  await next();
  debug('this second middleware exec end!');
});

app.use(async function (context, next) {
  debug('this third middleware exec start!');
  await next();
  debug('this third middleware exec end!');
});

app.use(async function (context, next) {
  debug('this fourth middleware exec start!');
  await debug('================ four content not next! ==================');
  debug('this fourth middleware exec end!');
});

app.run();