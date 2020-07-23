import Client from '../client';
import config from '../../../configs/config.server';
import Endpoints from './endpoints';
import ContentTypes from '../../definitions/httpContent';
import HttpMethod from '../../definitions/httpMethod';

class ApiClient extends Client {
	private baseUrl: (endpoint: string) => string = config.api.someapi.baseUrl;
	private userName?: string = config.api.someapi.auth.USER_NAME;
	private password?: string = config.api.someapi.auth.PASSWORD;

	public getSomeDataOne(onSuccess: (content: any, data: any, extra: any) => any, onError: (error?: Error) => any, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.ENDPOINT_ONE);

		const options = {
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON
			},
			auth: {
				username: this.userName,
				password: this.password
			}
		};

		this.performRequest(HttpMethod.GET, options, onSuccess, onError, extra);
	}

	public getSomeDataTwo(argument: string, onSuccess: (content: any, data: any, extra: any) => any, onError: (error?: Error) => any, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.ENDPOINT_TWO);

		const query = {
			arg: argument
		};

		const options = {
			qs: query,
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON
			},
			auth: {
				username: this.userName,
				password: this.password
			}
		};

		this.performRequest(HttpMethod.GET, options, onSuccess, onError, extra);
	}

	public getSomeDataThree(argument: string, onSuccess: (content: any, data: any, extra: any) => any, onError: (error?: Error) => any, extra?: any): void {
		const endPoint = this.baseUrl(Endpoints.endpointThree(argument));

		const options = {
			url: endPoint,
			parse: true,
			headers: {
				accept: ContentTypes.JSON
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
