export const EmailValidation = {
   EMAIL_EMPTY: 'The email is empty.',
   INVALID_EMAIL: 'The given email is not valid',

   LENGTH_EXCEEDED: (length: number) => `The email is too long as it exceeds ${length} characters`,
   USERNAME_TOOLONG: (length: number) => `The given email user name length is lesser than ${length} characters long`,
   DOMAIN_TOOLONG: (length: number) => `The given email domain name length is lesser than ${length} characters long`,
};

export const PasswordValidation = {
   PASSWORD_EMPTY: 'The password is empty!',
   ALPHA_NUMERIC: 'Password is not alpha numeric.',
  
   MIN_LENGTH: (length: number) => `Password length is lesser than ${length} characters long`,
   MAX_LENGTH: (length: number) => `Password length is greater than ${length} characters long`
};

export const PriviledgeValidation = {
   ADD_PRIVILEDGE: 'Please submit a priviledge',
   UNDEFINED_ERROR: 'The priviledge is undefined!',
   INVALID_PRIVILEDGE: 'The priviledge action is invalid',

   VALID_ACTIONS: (args: string[]) => `The valid actions are ${args}`
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

   VALID_ROLES: (args: string[]) => `The valid role type names are ${args}`
};
