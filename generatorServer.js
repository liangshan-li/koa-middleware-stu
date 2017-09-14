"use strict";
const co = require('co');
const debug = require('debug')('KoaGeneratorServer:LLS ');
const Server = require('./server');

class KoaGeneratorServer extends Server {

  constructor(props) {
    super(props);
  }

  use(fun) {
    return super.use(fun);
  }

  validator(fun) {
    if ('GeneratorFunction' !== fun.constructor.name) throw new Error('middleware fun must be a generator function!');
  }

  run() {
    debug(`====================> ${this.name} be ready to run  <=================`);
    return super.run();
  }

  exec() {
    debug(`====================> ${this.name} be ready to exec  <=================`);
    return super.exec();
  }

  * gen() {
    let next = function* () {
    };
    let idx = this.middlewares.length;
    while (idx--) {
      next = this.middlewares[idx].call(this, next);
    }
    yield* next;
  }

  genPromise() {
    debug(`====================> ${this.name} be ready to gen Promise  <=================`);
    return co(this.gen()).then(() => 'success and end');
  }

}

module.exports = KoaGeneratorServer;

