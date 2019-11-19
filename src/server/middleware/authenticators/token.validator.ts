
import config from '../../config';
import webtoken from 'jsonwebtoken';
import httpCode from '../../definitions/httpCode';
import AuthenticationService from '../../services/authentication.service';

import { AuthorizationMessages } from '../../messages/message.response';
import { AuthenticationResponse } from '../../responses/request.response';
import { Request, Response, NextFunction } from 'express';

const httpHeader = config.self.headers;

async function authenticate(req: any, res: Response, next: NextFunction) {
   const token = getToken(req);

   const response = new  AuthenticationResponse();

   if (!token) {
      response.authorized = false;
      response.message = AuthorizationMessages.NO_TOKEN;
      response.errors.push(AuthorizationMessages.NO_TOKEN_FOUND);
      return res.status(httpCode.UNAUTHORIZED).json(response);
   }

   try {
      const secret = config.jwt.TOKEN_SECRET;
      const decoded = webtoken.verify(token, secret);

      const blackListed = await isBlackListed(token);

      if (blackListed) {
         throw new Error(AuthorizationMessages.NO_ACTIVE_TOKEN);
      }

      req.user = decoded;

      return next();
   } catch (error) {
      response.authorized = false;
      response.message = AuthorizationMessages.NO_VALID_TOKEN;
      response.errors.push(error.message);
      return res.status(httpCode.UNAUTHORIZED).json(response);
   }
}

async function isBlackListed(token: string) {
   const service = new AuthenticationService();

   const { result, error } = await service.isBlackListed(token);

   if (error) return true;

   return result;
}

function getToken(req: Request) {
   const bearer = config.jwt.PREFIX;

   const token = req.header(httpHeader.TOKEN_HEADER) || req.header(httpHeader.AUTHORIZATION);

   if (!token) return null;

   if (token.startsWith(bearer)) {
      return token.slice(bearer.length, token.length);
   }

   return token;
}

export default authenticate;