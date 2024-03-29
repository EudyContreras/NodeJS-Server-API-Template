/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = (version) => ({
	__VERSION_NUMBER__: JSON.stringify(version),
	__CLIENT_RENDERED__: true,
	'process.env': {
		REACT_APP_SERVER_API_URL: JSON.stringify(process.env.REACT_APP_SERVER_API_URL)
	}
});
