.PHONY: run all clean
all:  install  exec1 exec2

install:
	@npm install

run: exec1 exec2

uninstall:
	@npm uninstall

exec1:
	@DEBUG=Koa* node test1.js

exec2:
	@DEBUG=Koa* node test2.js
