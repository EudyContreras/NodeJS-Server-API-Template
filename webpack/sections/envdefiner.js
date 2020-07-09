/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = () => {
	return {
		'process.env': {
			REACT_APP_SERVER_API_URL: JSON.stringify(process.env.REACT_APP_SERVER_API_URL)
		}
	};
};