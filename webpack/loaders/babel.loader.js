module.exports = {
	test: /\.(jsx|tsx|ts|js)$/,
	exclude: /(node_modules|bower_components)/,
	use: {
		loader: 'babel-loader',
		options: {
			env: {
				development: {
					presets: [
						['minify', {
							builtIns: false
						}]
					]
				},
				production: {
					presets: [
						['minify', {
							builtIns: false
						}]
					]
				}
			},
			presets: [
				'@babel/preset-react',
				'@babel/preset-typescript',
				['@babel/preset-env', {
					targets: {
						node: 'current'
					}
				}]
			],
			plugins: [
				['@babel/plugin-proposal-decorators', {
					'legacy': true
				}],
				'@loadable/babel-plugin',
				'@babel/plugin-proposal-object-rest-spread',
				'@babel/plugin-proposal-function-sent',
				'@babel/plugin-proposal-export-namespace-from',
				'@babel/plugin-proposal-numeric-separator',
				'@babel/plugin-proposal-throw-expressions',

				// Stage 3
				'@babel/plugin-syntax-dynamic-import',
				'@babel/plugin-syntax-import-meta',
				'@babel/plugin-proposal-class-properties',
				'@babel/plugin-proposal-json-strings',
				['@babel/plugin-transform-async-to-generator']
			]
		}
	}
};