export default class AuthenticationService {
   isBlackListed(token: string): { result: any; error: any; } | PromiseLike<{ result: any; error: any; }> {
      throw new Error("Method not implemented.");
   }
   
}