const endpoints = Object.freeze({
	ENDPOINT_ONE: 'something',
	ENDPOINT_TWO: 'something',

	endpointThree: function (arg: string) {
		return `somethings/${arg}`;
	}
});

export default endpoints;