
import httpCodes from '../../definitions/httpCode';

import { ValidationResult } from '@hapi/joi';
import { ValidationResponse } from '../../responses/request.response'
import { Response, Request, NextFunction } from 'express';

import * as AuthSchema from '../../validation/schemas/authentication/blueprint';
import * as UserSchema from '../../validation/schemas/user/blueprint';
import * as InviteSchema from '../../validation/schemas/invitation/blueprint';

import {
   GET,
   POST,
   PUT,
   PATCH,
} from '../../definitions/httpMethod';


function validate(schemaType: Symbol) {
   return (request: Request, response: Response, next: NextFunction) => {
      const data = request.body;
      const query = request.query;
      const method = request.method;

      if (!data) return next({ error: 'No data has been specified in the body' });

      switch (method) {
         case GET:     
            return buildResponse(handleRetrieval(schemaType, data, query), request, response, next);
         case PUT:
            return buildResponse(handleCreation(schemaType, data), request, response, next);
         case POST:
            return buildResponse(handlePosting(schemaType, data), request, response, next);
         case PATCH:
            return buildResponse(handleUpdate(schemaType, data), request, response, next);
      }
   };
}

function handlePosting(schemaType: Symbol, data: any){
   switch (schemaType) {
     case AuthSchema.CREDENTIALS: 
         return AuthSchema.validateCredentials(data);
   }
   return null;
}

function handleRetrieval(schemaType: Symbol, data: any, query: any) {
   const hasProps = Object.keys(query).length > 0;

   if (hasProps) {
      switch (schemaType) {
         case InviteSchema.INVITATION_QUERY:
            return InviteSchema.validateInviteQuery(query);
      }
   } 

   return null;
}

function handleCreation(schemaType: Symbol, data: any) {
   switch (schemaType) {
      case UserSchema.USER_CREATE: 
         return UserSchema.validateUserCreate(data);
      case InviteSchema.INVITATION_CREATE: 
         return InviteSchema.validateInviteCreate(data);
   }
   return null;
}

function handleUpdate(schemaType: Symbol, data: any){
   switch (schemaType) {
      case InviteSchema.INVITATION_UPDATE: 
         return InviteSchema.validateInviteUpdate(data);
   }
   return null;
}

function isEmptyObject(obj: any) {
   for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         return false;
      }
   }
   return true;
}

function buildResponse(validation: { message: string, result: ValidationResult } | null, request: any, response: Response, next: NextFunction) {
   if (validation === null) return next();

   const { error, value } = validation.result;

   if (error) {
      const validateResponse = new ValidationResponse();

      const errors = error.message.split('.');

      if (errors.length > 0) {
         const messages = errors.map(x => x.trim().replace(/"/g, ''));
         validateResponse.errors.push(...messages);
      } else {
         const message = error.message.replace(/"/g, '');
         validateResponse.errors.push(message);
      }

      validateResponse.message = validation.message;
      validateResponse.valid = false

      return response.status(httpCodes.BAD_REQUEST).json(validateResponse);
   }

   if (value) {
      request.data = value
   }

   return next();
}

export default validate