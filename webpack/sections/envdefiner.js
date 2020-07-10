/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = (version) => {
	return {
		__VERSION_NUMBER__: JSON.stringify(version),
		'process.env': {
			REACT_APP_SERVER_API_URL: JSON.stringify(process.env.REACT_APP_SERVER_API_URL)
		}
	};
};
