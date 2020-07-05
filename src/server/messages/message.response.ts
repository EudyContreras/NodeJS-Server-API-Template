import CronJob from '../webjobs/cronJob';

export const UserMessages = {
	NO_SUCH_ID: 'No user with the given id was found',
	NO_SUCH_EMAIL: 'No user with the give email was found',
	NO_SUCH_USER: 'No user with the give criteria was found',
	WRONG_PASSWORD: 'The given user password does not match our records',
	EMAIL_TAKEN: 'The given email is already taken'
};

export const PasswordMessages = {
	NO_SUCH_PASSWORD: ''
};

export const MiddlewareMessages = {
	INVALID_PROTOCOL: 'All side effects must be peformed using HTTPS'
};

export const PriviledgeMessages = {
	NOT_GRANTED: 'You do not have sufficient priviledges to perform this action',
	ACCESS_DENIED: 'You do not have sufficient priviledges to perform this action'
};

export const InvitationMessages = {
	EXPIRED: 'The invitation does not exist or it has expired',
	NOT_PENDING: 'There is no pending invitation for the given user',
	NO_INVITATION: 'No invitation was found for the give criteria',
	IS_ACTIVE: 'There already is an active accepted invitation for this user',
	IS_PENDING: 'There already is a pending active invitation for this user'
};

export const CredentialsMessages = {
	NO_USER_EMAIL: 'No user with the given email was found',
	NO_USER_FOUND: 'The user could not be authorized since it was not found',
	NOT_AUTHORIZED: 'The user could not be authorized',
	NO_CREDENTIALS: 'The user data could not be retrieved',
	WRONG_PASSWORD: 'The given password did not match our records!'
};

export const AuthorizationMessages = {
	NO_TOKEN: 'No valid token is present! Authorization denied!',
	NO_VALID_TOKEN: 'The found token is not valid! Authorization denied!',
	NO_ACTIVE_TOKEN: 'The given token is no longer valid or has been blacklisted',
	NO_TOKEN_FOUND: 'No token found'
};

export const AuthenticationMessages = {
	FAILURE: 'Something went wrong! Please try again later.',
	NO_USER_FOUND: 'No user with a matching user id was found',
	NO_USER_EMAIL: 'No user with the given email was found',
	WRONG_PASSWORD: 'The given password did not match our records',
	NOT_FETCHED: 'Could not retrieved the user information',
	NOT_AUTHORIZED: 'Could not authorized the user',
	NOT_RECOVERED: 'Could not perform a password recovery'
};

export const AccessRoleMessages = {
	ROLE_EXIST: 'A role matching the given criteria already exists',
	NO_SUCH_ROLE: 'No role with the given criteria was found'
};

export const NotificationMessages = {
	RECOVERY_EMAIL: 'A recovery email has been sent to the given email address'
};

export const SchedulerMessages = {
	LABEL_REQUIRED: 'A job label must be provided',
	INTERVAL_REQUIRED: 'A job interval must be provided',

	notifyStart: (job: CronJob): string => {
		return `Satarted job: '${job.label}' to run at: '${job.interval}'`;
	}
};

export const ResponseMessages = {
	NOT_CREATED: (name: string): string => `The ${name} could not be created`,
	NOT_FETCHED: (name: string): string => `The ${name} could not be fetched`,
	NOT_UPDATED: (name: string): string => `The ${name} could not be updated`,
	NOT_DELETED: (name: string): string => `The ${name} could not be deleted`,
	NOT_FETCHED_ALL: (name: string): string => `The ${name}s could not be fetched`
};