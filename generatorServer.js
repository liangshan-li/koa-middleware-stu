"use strict";
const co = require('co');
const debug = require('debug')('KoaGeneratorServer:LLS ');

class KoaGeneratorServer {

  constructor() {
    this.middlewares = [];
  }

  use(fun) {
    if (!fun) throw new Error('middleware fun must be exists!');
    if ('GeneratorFunction' !== fun.constructor.name) throw new Error('middleware fun must be a generator function!');
    this.middlewares.push(fun);
    return this; //方便链式调用
  }

  run() {
    debug(`========> server start run <============`);
    this.exec().then(() => {
      debug(`============> server end run <============`);
    }).catch(() => {
      debug(`============> server run exists error <============`);
    });
  }

  exec() {
    debug(`============> start exec middleware <============`);
    return co(this.gen()).then(() => {
      debug(`============> end exec middleware <============`);
    });
  }

  * gen() {
    let next = function *() {};
    let idx = this.middlewares.length;
    while (idx--) {
      next = this.middlewares[idx].call(this, next);
    }
    yield *next;
  }

}

module.exports = KoaGeneratorServer;

