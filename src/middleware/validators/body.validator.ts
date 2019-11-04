
import httpCodes from '../../definitions/httpCode';

import { ValidationResponse } from '../../responses/request.response'
import { ValidationResult } from '@hapi/joi';

import { Response, Request, NextFunction } from 'express';

import { CREDENTIALS } from '../../validation/schemas/authentication/blueprint';

import * as AuthSchema from '../../validation/schemas/authentication/blueprint';

import {
   GET,
   POST,
   PUT,
   PATCH,
} from '../../definitions/httpMethod';


function validate(schemaType: Symbol) {
   return (req: Request, res: Response, next: NextFunction) => {
      const data = req.body;
      const method = req.method;

      if (!data) return next({ error: 'No data has been specified in the body' });

      switch (method) {
         case GET:     
            return buildResponse(handleRetrieval(schemaType, data), req, res, next);
         case PUT:
            return buildResponse(handleCreation(schemaType, data), req, res, next);
         case POST:
            return buildResponse(handlePosting(schemaType, data), req, res, next);
         case PATCH:
            return buildResponse(handleUpdate(schemaType, data), req, res, next);
      }
   };
}
function handlePosting(schemaType: Symbol, data: any) {
   switch (schemaType) {
     case CREDENTIALS: 
         return AuthSchema.validateCredentials(data);
   }
   return null;
}

function handleRetrieval(schemaType: Symbol, data: any) {
   switch (schemaType) {
   
   }
   return null;
}

function handleUpdate(schemaType: Symbol, data: any) {
   switch (schemaType) {
      
   }
   return null;
}

function handleCreation(schemaType: Symbol, data: any) {
   switch (schemaType) {
     
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

function buildResponse(validation: ValidationResult | null , req: any, res: Response, next: NextFunction) {
   if (validation === null) return next();

   const { error, errors, value} = validation;

   if (error || errors) {
      const response = new ValidationResponse();

      if (errors != null) {
         const errors = error.message.split('.');
         const messages = errors.map(x => x.trim().replace('"', ''));
         response.errors.push(...messages);
      } else {
         const message = error.message.replace(/"/g, '');
         response.errors.push(message);
      }

      response.message = 'Invalid body data';
      response.valid = false

      return res.status(httpCodes.BAD_REQUEST).json(response);
   }

   if (value) {
      req.data = value
   }

   return next();
}

export default validate