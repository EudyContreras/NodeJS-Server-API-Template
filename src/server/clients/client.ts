
import request from 'request';
import HttpMethod from '../definitions/httpMethod';

class Client {

	/**
    * Performs an API request with the given parameters.
    * @param type The type of request to be made to our server.
    * @param options The options used for building our request.
    * @param onSuccess The callback which is triggered upon success.
    * @param onError The callback which is triggered upon an error.
    * @param extra Extra data to be passed down to a successful request.
    */
	protected performRequest(type: HttpMethod, options: any, onSuccess: Function, onError: Function, extra?: any): void {
		const callback = function callback(error: Error, response: request.Response, body: any): void {
			if (error) return onError(error);

			const data = options.parse ? JSON.parse(body) : body;
			const content = options.parse ? JSON.parse(response.body) : response.body;

			if (onSuccess) {
				onSuccess(content, data, extra);
			}
		};

		try {
			switch (type) {
				case HttpMethod.GET:
					request.get(options, callback);
					break;
				case HttpMethod.POST:
					request.post(options, callback);
					break;
				default:
					break;
			}
		} catch (error) {
			if (onError) {
				onError(error.message);
			}
		}
	}
}

export default Client;
