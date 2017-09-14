"use strict";
const debug = require('debug')('KoaMiddlewareServer test:LLS');

class Server {
  constructor(name) {
    this.middlewares = [];
    this.name = name;
  }

  use(fun) {
    if (typeof fun !== 'function') throw new Error('fun must be a function!');
    debug(`fun name is ${fun.constructor.name}`);
    this.validator(fun);
    this.middlewares.push(fun);
    return this;  //链式调用
  }

  validator(fun) {
    debug(`this is empty validator!`);
  }

  run() {
    const start = Date.now();
    debug(`========> ${this.name} server start run <============`);
    return this.exec().then(() => {
      debug(`============> ${this.name}  server end run <============`);
    }).catch(() => {
      debug(`============> server run exists error <============`);
    }).then(() => {
      const ms = Date.now() - start;
      debug(`================>     time is ${ms}ms      <================`);
      debug(`============================================================`);
      debug(`============================================================`);
      debug(`===============> ${this.name}  is finished! <===============`);
      debug(`============================================================`);
      debug(`============================================================`);
    });
  }

  exec() {
    debug(`============> ${this.name}  start exec middleware  <============`);
    return this.genPromise().then((res) => {
      debug(`============> ${this.name}  exec result ===> ${res} <============`);
      debug(`============> ${this.name}  end exec middleware    <============`);
    });
  }

  genPromise() {
    return Promise.resolve('nothing to do !');
  }

}

module.exports = Server;