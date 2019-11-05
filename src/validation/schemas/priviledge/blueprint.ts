import Joi from '@hapi/joi';

import { ALL } from '../../../localstore/priviledge.store';
import { SchemaValidation } from '../../../messages/message.validation';

export const PRIVILEDGE_CREATE = Symbol('priviledge_create');
export const PRIVILEDGE_UPDATE = Symbol('priviledge_update');
export const PRIVILEDGE_QUERY = Symbol('priviledge_query');

export const schamaType = {
   PRIVILEDGE_CREATE,
   PRIVILEDGE_UPDATE,
   PRIVILEDGE_QUERY
}

export const validatePriviledgeCreate = (data: any) => {

   const schema = Joi.object({
      userId: Joi
         .string()
         .required(),
      actionId: Joi
         .string()
         .required()
         .allow(...ALL)
         .only(),
      controllerId: Joi
         .string()
         .required()
   });

   return {
      message: SchemaValidation.CREATE_DATA('priviledge'),
      result: schema.validate(data, {
         abortEarly: false
      })
   };
}

export const validatePriviledgeUpdate = (data: any) => {

   const schema = Joi.object({
      userId: Joi
         .string()
         .optional(),
      actionId: Joi
         .string()
         .optional()
         .allow(...ALL)
         .only(),
      controllerId: Joi
         .string()
         .optional()
   });

   return {
      message: SchemaValidation.UPDATE_DATA('priviledge'),
      result: schema.validate(data, {
         abortEarly: false
      })
   };
}

export const validatePriviledgeQuery = (data: any) => {
  
   const schema = Joi.object({
      userId: Joi
         .string()
         .required(),
      controllerId: Joi
         .string()
         .optional()
   })

   return {
      message: SchemaValidation.FETCH_DATA('priviledge'),
      result: schema.validate(data, {
         abortEarly: false
      })
   };
}

export default schamaType;
