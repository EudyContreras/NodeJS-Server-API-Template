/* eslint-disable @typescript-eslint/no-var-requires */
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const fs = require('fs');

class WaitPlugin extends WebpackBeforeBuildPlugin {
	constructor({ filename, interval = 100, timeout = 10000 }) {
		super(function(stats, callback) {
			const start = Date.now();

			function poll() {
				if (fs.existsSync(filename)) {
					callback();
				} else if (Date.now() - start > timeout) {
					throw Error(`Maybe it just wasn\'t meant to be for ${filename}`);
				} else {
					setTimeout(poll, interval);
				}
			}
			poll();
		});
	}
}

module.exports = WaitPlugin;