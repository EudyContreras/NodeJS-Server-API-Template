/* eslint-disable @typescript-eslint/no-var-requires */
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const fs = require('fs');

const anyExist = (filename) => {
	if (Array.isArray(filename)) {
		for (const file in filename) {
			if(!fs.existsSync(file)) {
				return false;
			}
		}
		return true;
	} else {
		return fs.existsSync(filename);
	}
};

class WaitPlugin extends WebpackBeforeBuildPlugin {
	constructor({ filename, interval = 100, timeout = 30000 }) {
		super(function (stats, callback) {
			const start = Date.now();
			function poll() {
				if (anyExist(filename)) {
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
