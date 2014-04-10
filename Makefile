build:
	@node_modules/.bin/component build

watch:
	@node_modules/.bin/component build -w

server: build
	@node_modules/.bin/http-server .

.PHONY: build
