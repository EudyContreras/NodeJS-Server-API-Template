import Joi from '@hapi/joi';
import { ALL } from '../../../localstore/accessrole.store';
import { InvitationValidation  } from '../../../messages/message.validation';

export const INVITATION_CREATE = Symbol('invitation_create');
export const INVITATION_UPDATE = Symbol('invitation_update');

export const schamaType = {
   INVITATION_CREATE,
   INVITATION_UPDATE
}

export const validateInviteCreate = (data: any) => {

   const schema = Joi.object({
      email: Joi
         .string()
         .required()
         .email(),
      role: Joi
         .string()
         .required()
         .allow(...ALL)
         .only(),
      expirationTime: Joi
         .number()
         .optional()
   });
   
   return {
      message: InvitationValidation.INVITE_CREATE_DATA,
      result: schema.validate(data, {
         abortEarly: false
      })
   };
}

export const validateInviteUpdate = (data: any) => {

   const schema = Joi.object({
      email: Joi
         .string()
         .optional()
         .email(),
      role: Joi
         .string()
         .optional()
         .allow(...ALL)
         .only(),
      expirationTime: Joi
         .number()
         .optional()
   });
   
   return {
      message: InvitationValidation.INVITE_UPDATE_DATA,
      result: schema.validate(data, {
         abortEarly: false
      })
   };
}

export default schamaType;
