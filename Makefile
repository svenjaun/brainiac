NPM=npm

all: discord_bot

discord_bot:
	$(NPM) install
	NODE_ENV=production $(NPM) run docs

clean:
	rm -rf dist
	rm -rf node_modules