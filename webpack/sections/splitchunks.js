const singleShunk = {
	cacheGroups: {
		commons: {
			reuseExistingChunk: true,
			enforce: true,
			chunks: 'all',
			test: /[\\/]node_modules[\\/]/,
			name: 'vendor/vendors'
		}
	}
};

const multiChunk = {
	chunks: 'all',
	maxInitialRequests: Infinity,
	minSize: 0,
	cacheGroups: {
		commons: {
			reuseExistingChunk: true,
			enforce: true,
			chunks: 'all',
			test: /[\\/]node_modules[\\/]/,
			name(module, chunks, cacheGroupKey) {
				const folder = 'common';
				const moduleFileName = module.identifier().split('/').reduceRight(item => item);
				const allChunksNames = chunks.map((item) => item.name).join('~');
				return `${folder}/${cacheGroupKey}-${allChunksNames}-${moduleFileName.replace('.js', '')}`;
			}
		},
		vendor: {
			chunks: 'all',
			test: /[\\/]node_modules[\\/]/,
			name(module, chunks, cacheGroupKey) {
				const folder = 'vendor';
				const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
				const allChunksNames = chunks.map((item) => item.name).join('~');
				return `${folder}/${cacheGroupKey}-${allChunksNames}-${packageName.replace('@', '')}`;
			}
		}
	}
};

module.exports = {
	singleShunk,
	multiChunk
};