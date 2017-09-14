.PHONY: run all install exec1 exec2 uninstall

install:
	@npm install

run: exec1 exec2

all:  install  exec1 exec2

uninstall:
	@npm uninstall

exec1:
	@DEBUG=KoaGeneratorServer:LLS* node test1.js

exec2:
	@DEBUG=KoaAsyncServer:LLS test* node test2.js
