"use strict";
const debug = require('debug')('KoaAsyncServer:LLS');

class KoaAsyncServer {
  constructor() {
    this.middlewares = [];
    this.count = -1;
  }

  use(fun) {
    if (typeof fun !== 'function') throw new Error('fun must be a function!');
    if (fun.constructor.name === 'GeneratorFunction') throw new Error('fun must not be a generator function!');

    debug(`fun name is ${fun.constructor.name}`);
    this.middlewares.push(fun);
    return this; //方便链式调用
  }

  run() {
    debug(`========> server start run <============`);
    return this.exec().then(()=> {
      debug(`============> server end run <============`);
    }).catch(() => {
      debug(`============> server run exists error <============`);
    });
  }

  exec() {
    debug(`================== start exec ===================`);
    const context = this.createContext({name: 'exec context!', statusCode: '200'});
    context.exec = "this is exec!";

    return this.toPromises(context).then(() => {
      debug(` exec res ==> ${JSON.stringify(context, null, 2)}`);
      debug(`================== end exec finished===================`);
    }).catch((err) => {
      debug(`exec exists error ==> ${JSON.stringify(err, null, 2)}`);
    });
  }

  createContext(config) {
    if (!config) config = {};
    const context = Object.assign({}, config);
    context.request = 'this is a request!';
    context.response = 'this is a response!';
    context.body = 'this is a body!';

    debug(`context is created! ===> context = ${JSON.stringify(context, null, 2)}`);
    return context;
  }

  toPromises(context, next) {
    if (this.middlewares.length === 0) return;
    if (!Array.isArray(this.middlewares)) throw new Error('The middlewares stack must be an array!')
    for (let fun of this.middlewares) {
      if (typeof fun !== 'function') throw new Error('The middlewares  must be composed of functions!')
    }

    debug(`================== start toPromises ===================`);
    this.count = -1;
    return this.toPromise(0, context, next);
  }

  toPromise(idx, context, next) {
    if (idx <= this.count) return Promise.reject(new Error('called error!'));
    this.count = idx;
    let fun = this.middlewares[idx];
    if (this.middlewares.length === idx) {
      fun = next;
      debug(`========= toPromise end ==> last index: ${idx} ==========`);
    }
    if (!fun) return Promise.resolve();

    try {
      debug(`toPromise ==> index: ${idx}`);
      return Promise.resolve(fun(context, () => this.toPromise(idx + 1)));
    }
    catch (error) {
      debug(`toPromise  error ==> index: ${idx} & err: ${JSON.stringify(error, null, 2)}`);
      return Promise.reject(error);
    }
  }

}

module.exports = KoaAsyncServer;