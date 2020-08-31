
const handlebarsLoader = { 
	test: /\.hbs$/, 
	loader: 'handlebars-loader' 
};

const htmlLoader = { 
	test: /\.html$/i, 
	loader: 'html-loader' 
};

module.exports = () => [
	handlebarsLoader,
	htmlLoader
];
