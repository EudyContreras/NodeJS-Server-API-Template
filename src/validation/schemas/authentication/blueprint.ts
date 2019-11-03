import Joi from '@hapi/joi';
import Vault from '../../../config/vault';

export const CREDENTIALS = Symbol('credentials');

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
   
   return schema.validate(data);
}
