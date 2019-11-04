
export class EmainNotificationException extends Error {
   sender: string;
   recipient: string;
   message: string;
 
   constructor(sender: string, recipient: string, message: string) {
     super(message);
     this.sender = sender;
     this.recipient = recipient;
     this.message = message;
   }
 }