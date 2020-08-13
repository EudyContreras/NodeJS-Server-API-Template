module.exports = function (api) {
	api.cache.using(() => process.env.NODE_ENV);

	const presets = [
		['@babel/preset-env', {
			targets: {
				esmodules: false,
				node: 'current'
			}
		}],
		'@babel/preset-typescript',
		'@babel/preset-react'
	];
	const plugins = [
		'@babel/plugin-transform-typescript',
		['styled-components', { ssr: true, displayName: true } ],
		'react-css-modules',
		'@loadable/babel-plugin',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-proposal-numeric-separator',
		'@babel/plugin-proposal-throw-expressions',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		[
			'@babel/plugin-proposal-pipeline-operator',
			{
				proposal: 'minimal'
			}
		],
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta',
		'@babel/plugin-proposal-json-strings',
		'@babel/plugin-transform-async-to-generator',
		'@babel/plugin-proposal-nullish-coalescing-operator',
		'@babel/plugin-proposal-do-expressions',
		'@babel/plugin-proposal-function-bind'
	].filter(Boolean);

	const developmentPlugins = [
		['styled-components', { ssr: true, displayName: true } ]
	];

	const productionPlugins = [
		['styled-components', { ssr: true, displayName: true } ],
		'transform-react-remove-prop-types',
		'@babel/plugin-transform-react-inline-elements',
		['babel-plugin-transform-react-class-to-function', { memo: true }]
	];

	return {
		env: {
			production: {
				plugins: productionPlugins,
				presets: []
			},
			development: {
				plugins: developmentPlugins,
				presets: []
			}
		},
		presets,
		plugins
	};
};
