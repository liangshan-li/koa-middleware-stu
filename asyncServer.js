"use strict";
require('babel-register');
const debug = require('debug')('KoaAsyncServer:LLS');
const Server = require('./server');

class KoaAsyncServer extends Server{
  constructor(props) {
    super(props);
    this.count = -1;
  }

  use(fun) {
    return super.use(fun)
  }

  validator(fun) {
    debug(`====================> ${this.name} validator  <=================`);
  }

  run() {
    debug(`====================> ${this.name} be ready to run  <=================`);
    return super.run();
  }

  exec() {
    debug(`====================> ${this.name} be ready to exec  <=================`);
    debug(`====================> ${this.name} start exec <========================`);
    const context = this.createContext({name: 'exec context!', statusCode: '200'});
    context.exec = "this is exec!";

    return this.toPromises(context).then(() => {
      debug(`=====> ${this.name} exec res ==> ${JSON.stringify(context, null, 2)} <=====`);
      debug(`==================> ${this.name} end exec finished <===================`);
    }).catch((err) => {
      debug(`=====>  ${this.name} exec exists error ==> ${JSON.stringify(err, null, 2)} <====`);
    });
  }

  createContext(config) {
    if (!config) config = {};
    const context = Object.assign({}, config);
    context.request = 'this is a request!';
    context.response = 'this is a response!';
    context.body = 'this is a body!';

    debug(`====> context is created! ===> context = ${JSON.stringify(context, null, 2)} <====`);
    return context;
  }

  toPromises(context, next) {
    if (this.middlewares.length === 0) return;
    if (!Array.isArray(this.middlewares)) throw new Error('The middlewares stack must be an array!');
    for (let fun of this.middlewares) {
      if (typeof fun !== 'function') throw new Error('The middlewares  must be composed of functions!');
    }

    debug(`==================> ${this.name}  start toPromises <===================`);
    this.count = -1;
    return this.toPromise(0, context, next);
  }

  toPromise(idx, context, next) {
    if (idx <= this.count) return Promise.reject(new Error('called error!'));
    this.count = idx;
    let fun = this.middlewares[idx];
    if (this.middlewares.length === idx) {
      fun = next;
      debug(`=========> ${this.name}  toPromise end ==> last index: ${idx} <==========`);
    }
    if (!fun) return Promise.resolve();

    try {
      debug(`===> ${this.name} toPromise ==> index: ${idx} <====`);
      return Promise.resolve(fun(context, () => this.toPromise(idx + 1)));
    }
    catch (error) {
      debug(`===> ${this.name} toPromise  error ==> index: ${idx} & err: ${JSON.stringify(error, null, 2)} <===`);
      return Promise.reject(error);
    }
  }

}

module.exports = KoaAsyncServer;