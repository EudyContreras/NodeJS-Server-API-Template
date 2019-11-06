"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const vault_1 = __importDefault(require("../config/vault"));
class EmailHandler {
    constructor(accountInfo) {
        this.account = {
            username: accountInfo.user,
            password: accountInfo.pass
        };
    }
    canSendEmails() {
        return false;
    }
    sendTempPasswordEmail(email, tempPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailContent = {
                emailAddresses: email,
                emailSubject: 'Password Recovery',
                emailBody: `Here is a temporary password: ${tempPassword}`,
                emailHtml: null
            };
            return yield this.sendEmail(emailContent, this.account);
        });
    }
    sendInvitationEmail(invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = vault_1.default.host.APP_NAME;
            const site = vault_1.default.host.BASE_URL;
            const emailContent = {
                emailAddresses: invitation.email,
                emailSubject: 'Invitation',
                emailBody: `You have been invited to ${name}. Please follow the link to create an account: ${site}`,
                emailHtml: null
            };
            return yield this.sendEmail(emailContent, this.account);
        });
    }
    /**
  * Sends an email using an injected dependency.
  * @param  emailContent The content of the email
  * to be sent.
  */
    sendEmail(emailContent, account) {
        return __awaiter(this, void 0, void 0, function* () {
            const toEmail = emailContent.emailAddresses;
            const senderEmail = account.senderEmail;
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer_1.default.createTransport({
                host: account.host,
                port: account.port,
                secure: true,
                auth: {
                    user: account.username,
                    pass: account.password
                }
            });
            // send mail with defined transport object
            const info = yield transporter.sendMail({
                to: toEmail,
                from: senderEmail,
                subject: emailContent.emailSubject,
                text: emailContent.emailBody,
                html: emailContent.emailHtml
            });
            console.log(`Message sent: ${info.messageId}`);
            return info;
        });
    }
}
exports.default = EmailHandler;
