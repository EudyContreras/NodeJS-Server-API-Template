/**
 * @description Response produced when an authentication
 * is requested by a user.
 */
export class AuthenticationResponse {
	public authorized = false;
	public content?: any | null;
	public message?: any | null;
	public errors: any[] = [];
}
/**
 * @description Response produced when a request for user
 * credential data is requested by a user.
 */
export class CredentialsResponse {
	public authorized = false;
	public errors: any[] = [];
}

/**
 * @description Response produced when validation of
 * data takes place.
 */
export class ValidationResponse {
	public valid = false;
	public message = '';
	public errors: any[] = [];
}

/**
 * @description Response produced when a permission is
 * requested for access to certain resource.
 */
export class AccessResponse {
	public granted = false;
	public errors: any[] = [];
}

/**
 * @description Response produced when a priviledge is requested
 * to perform a certain action within a resouce.
 */
export class PriviledgeResponse {
	public hasAccess?: boolean | null;
	public permission?: string | null;
	public message?: string | null;
	public errors: any[] = [];
}

/**
 * @description Response produced when a registration takes
 * place.
 */
export class RegistrationResponse {
	public token?: string | null;
	public email?: string | null;
	public errors: any[] = [];
}

/**
 * @description A common api response to a request.
 */
export class ApiResponse {
	public message?: any | null;
	public content: any | null;
	public errors: any[] = [];
}