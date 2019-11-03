/**
 * Response produced when an authentication
 * is requested by a user.
 */
export class AuthenticationResponse {
   authorized: boolean = false;
   message?: any = null;
   errors: any[] = []
}
/**
 * Response produced when a request for user
 * credential data is requested by a user.
 */
export class CredentialsResponse {
   authorized: boolean = false;
   errors: any[] = []
}

/**
 * Response produced when validation of
 * data takes place.
 */
export class ValidationResponse {
   valid: boolean = false;
   message: string = '';
   errors: any[] = []
}

/**
 * Response produced when a permission is
 * requested for access to certain resource.
 */
export class AccessResponse {
   granted: boolean = false;
   errors: any[] = []
}

/**
 * Response produced when a priviledge is requested
 * to perform a certain action within a resouce.
 */
export class PriviledgeResponse {
   hasAccess: boolean = false;
   actionId: string = '';
   message: string = '';
   errors: any[] = []
}

/**
 * Response produced when a registration takes
 * place.
 */
export class RegistrationResponse {
   token: string = '';
   email: string = '';
   errors: any[] = []
}

/**
 * A common api response to a request.
 */
export class ApiResponse {
   content: any = '';
   errors: any[] = []
}