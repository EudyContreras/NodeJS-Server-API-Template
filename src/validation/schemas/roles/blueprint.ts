import Joi from '@hapi/joi';
import Vault from '../../../config/vault';

export const validate = (data: any) => {

   const schema = Joi.object();
   
   return schema.validate(data);
}
