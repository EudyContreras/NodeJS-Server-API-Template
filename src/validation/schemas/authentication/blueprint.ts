import Joi from '@hapi/joi';

import Vault from '../../../config/vault';

import { SchemaValidation  } from '../../../messages/message.validation';

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
      message: SchemaValidation.CREATE_DATA('credentials'),
      result: schema.validate(data, {
         abortEarly: false
      })
   }
}

export default schamaType;