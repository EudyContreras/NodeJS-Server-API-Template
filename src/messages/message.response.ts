export const UserMessages = {
   validation: {
      
   },
   general: {

   }
}

export const PriviledgeMessages = {
   NOT_GRANTED: 'You do not have sufficient priviledges to perform this action',
   ACCESS_DENIED: 'You do not have sufficient priviledges to perform this action',
}

export const InvitationMessages = {

}

export const CredentialsMessages = {
   NO_USER_EMAIL: 'No user with the given email was found',
   NO_USER_FOUND: 'The user could not be authorized since it was not found',
   NOT_AUTHORIZED: 'The user could not be authorized',
   NO_CREDENTIALS: 'The user data could not be retrieved',
   WRONG_PASSWORD: 'The given password did not match our records!',
}

export const AuthorizationMessages = {
   NO_TOKEN: 'No valid token is present! Authorization denied!',
   NO_VALID_TOKEN: 'The found token is not valid! Authorization denied!',
   NO_ACTIVE_TOKEN: 'The given token is no longer valid or has been blacklisted',
   NO_TOKEN_FOUND: 'No token found'
}

export const RoleMessages = {
   DENIED: 'You do not have sufficient priviledges to perform this action',
   NONE_FOUND: 'No role was found for this user',
   INVALID_CODE: 'The given role code is invalid',
}