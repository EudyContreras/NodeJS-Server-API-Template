import EmailHandler from '../handlers/email.handler';

export default class NotificationService {
  
   async sendInvitationEmail(invite: any): Promise<Boolean> {
      throw new Error("Method not implemented.");
   }
   
   canSendEmails(): boolean {
      throw new Error("Method not implemented.");
   }

   async sendPasswordRecoveryEmail(email: any, randomPassword: string): Promise<Boolean> {

      if (!this.canSendEmails()) {
         throw new Error('No email SMTP service has been configured!');
      }
      throw new Error("Method not implemented.");
   }

}