export const EmailValidation = {
	EMAIL_EMPTY: 'The email is empty.',
	INVALID_EMAIL: 'The given email is not valid',

	LENGTH_EXCEEDED: (length: number): string => `The email is too long as it exceeds ${length} characters`,
	USERNAME_TOOLONG: (length: number): string =>
		`The given email user name length is lesser than ${length} characters long`,
	DOMAIN_TOOLONG: (length: number): string =>
		`The given email domain name length is lesser than ${length} characters long`
};

export const PasswordValidation = {
	PASSWORD_EMPTY: 'The password is empty!',
	ALPHA_NUMERIC: 'Password is not alpha numeric.',

	MIN_LENGTH: (length: number): string => `Password length is lesser than ${length} characters long`,
	MAX_LENGTH: (length: number): string => `Password length is greater than ${length} characters long`
};

export const PriviledgeValidation = {
	ADD_PRIVILEDGE: 'Please submit a priviledge',
	UNDEFINED_ERROR: 'The priviledge is undefined!',
	INVALID_PRIVILEDGE: 'The priviledge action is invalid',

	VALID_ACTIONS: (args: string[]): string => `The valid actions are ${args}`
};

export const AuthenticationValidation = {
	CREDENTIALS: ''
};

export const SchemaValidation = {
	FETCH_DATA: (arg: string): string => `The ${arg} query data is invalid`,
	CREATE_DATA: (arg: string): string => `The ${arg} creation data is invalid`,
	UPDATE_DATA: (arg: string): string => `The ${arg} update data is invalid`
};

export const InvitationValidation = {
	INVITE_FETCH_DATA: 'The invitation query data is invalid',
	INVITE_CREATE_DATA: 'The invitation creation data is invalid',
	INVITE_UPDATE_DATA: 'The invitation update data is invalid'
};

export const UserValidation = {
	USER_FETCH_DATA: 'The user query data is invalid',
	USER_CREATE_DATA: 'The user creation data is invalid',
	USER_UPDATE_DATA: 'The user update data is invalid'
};

export const AccessRoleValidation = {
	DENIED: 'Access for the specified role has been denied',
	NONE_FOUND: 'No role with the given criteria was found for the user',
	INVALID_CODE: 'The role code for the user is invalid'
};

export const RoleValidation = {
	ADD_ROLE: 'Please submit a role type name',
	UNDEFINED_ERROR: 'The role type name is undefined!',
	INVALID_ROLE: 'The role type name is invalid',
	NOT_FETCHED: 'The role could not be retrieved',
	NOT_FETCHED_ALL: 'The roles could not be retrieved',
	NOT_CREATED: 'The role could not be created',
	NOT_DELETED: 'The role could not be deleted',
	NOT_UPDATED: 'THe role could not be updated',

	VALID_ROLES: (args: string[]): string => `The valid role type names are ${args}`
};
