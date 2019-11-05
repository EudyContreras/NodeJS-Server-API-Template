import Joi from '@hapi/joi';
import Vault from '../../../config/vault';

import { AuthenticationValidation  } from '../../../messages/message.validation';

export const CREDENTIALS = Symbol('credentials');

export const schamaType = {
   CREDENTIALS
}

export const validateCredentials = (data: any) => {

   const schema = Joi.object({
      email: Joi
         .string()
         .required()
         .email(),
      password: Joi
         .string()
         .required()
         .min(Vault.validation.passwords.MIN_LENGTH)
         .max(Vault.validation.passwords.MAX_LEGHTH)
   });
   
   return {
      message: AuthenticationValidation.CREDENTIALS,
      result: schema.validate(data)
   }
}
