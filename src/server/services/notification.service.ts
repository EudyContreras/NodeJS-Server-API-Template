import EmailHandler from '../handlers/email.handler';

export default class NotificationService {
  
   async sendInvitationEmail(invite: any): Promise<Boolean> {
      return false;
   }
   
   canSendEmails(): boolean {
      throw new Error("Method not implemented.");
   }

   async sendPasswordRecoveryEmail(email: any, randomPassword: string): Promise<Boolean> {

      if (!this.canSendEmails()) {
         return Promise.resolve(true).then()
      }
      throw new Error("Method not implemented.");
   }

}