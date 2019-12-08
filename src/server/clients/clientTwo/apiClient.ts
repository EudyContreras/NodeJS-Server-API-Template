
import Client from '../client';
import config from '../../config';
import Endpoints from './endpoints';
import ContentTypes from '../../definitions/httpContent';
import HttpMethod from '../../definitions/httpMethod';

class ApiClient extends Client {

	private baseUrl: Function = config.api.someapi.baseUrl;
	private userName?: string = config.api.someapi.auth.USER_NAME;
	private password?: string = config.api.someapi.auth.PASSWORD;

	public getSomeDataOne(onSuccess: Function, onError: Function, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.ENDPOINT_ONE);

		const options = {
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON,
			},
			auth: {
				username: this.userName,
				password: this.password
			}
		};

		this.performRequest(HttpMethod.GET, options, onSuccess, onError, extra);
	}

	public getSomeDataTwo(argument: string, onSuccess: Function, onError: Function, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.ENDPOINT_TWO);

		const query = {
			arg: argument
		};

		const options = {
			qs: query,
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON,
			},
			auth: {
				username: this.userName,
				password: this.password
			}
		};

		this.performRequest(HttpMethod.GET, options, onSuccess, onError, extra);
	}

	public getSomeDataThree(argument: string, onSuccess: Function, onError: Function, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.endpointThree(argument));

		const options = {
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON,
			},
			auth: {
				username: this.userName,
				password: this.password
			}
		};

		this.performRequest(HttpMethod.GET, options, onSuccess, onError, extra);
	}
}

export default ApiClient;
