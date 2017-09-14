## this is example for koa middleware
generatorServer 是koa generator 中间件的实现模拟

asyncServer 是koa async await 中间的实现模拟

## Getting started
Makefile and Dockerfile \
run in local and run docker image

### ___async___ functions (node v7.6+)

```js
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ms}ms`);
});
```

## Installation (two ways)
```
npm install 
make install
```
## Run
```
1. make all 
2. npm start

```

## example (test)

test1.js and test2.js



## Author
yongyulixiangzhihe (liliangshan)

## Generator 和 Async 的比较

async 函数是什么？一句话，它就是 Generator 函数的语法糖。\
async 函数对 Generator 函数的改进，体现在以下四点。

1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
2. 更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
3. 更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
4. 返回值是 Promise。async函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用then方法指定下一步的操作。\

进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。

总之，使用范围和便捷性方面，async 具有一定的优势，这也是为啥能够成为ES的标准。


## Generator middleware 和 Async middleware 性能
个人观点： Async 是 Generator 函数的语法糖 因此性能差别不大！ 但由于 Generator middleware 机制运用了 co ，因此，可以直接支持并发操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。
这时，要把并发的操作都放在数组或对象里面，跟在yield语句后面。 而Async 需要通过Promise.all()包装，才能执行并发操作。
其实区别不大。但是Async 中await使用范围更广。


总之， async/await做的就是将Promise对象给串联起来，避免了then的调用方式，代码非常的易读，就是一种同步的方式。不再需要借助其他外界类库（比如co库）就可以优雅的解决回调的问题。
所以，从这一点上Async更有优势。




  
  
