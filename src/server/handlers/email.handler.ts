import nodemailer from 'nodemailer';
import config from '../../configs/config.server';

export default class EmailHandler {
	private account: any;

	constructor(accountInfo: any) {
		this.account = {
			username: accountInfo.user,
			password: accountInfo.pass
		};
	}

	public canSendEmails(): boolean {
		return false;
	}

	public async sendTempPasswordEmail(email: string, tempPassword: string): Promise<{ info: any }> {
		const emailContent = {
			emailAddresses: email,
			emailSubject: 'Password Recovery',
			emailBody: `Here is a temporary password: ${tempPassword}`,
			emailHtml: null
		};

		return await this.sendEmail(emailContent, this.account);
	}

	public async sendInvitationEmail(invitation: any): Promise<{ info: any }> {
		const name = config.host.APP_NAME;
		const site = config.host.BASE_URL;

		const emailContent = {
			emailAddresses: invitation.email,
			emailSubject: 'Invitation',
			emailBody: `You have been invited to ${name}. Please follow the link to create an account: ${site}`,
			emailHtml: null
		};

		return await this.sendEmail(emailContent, this.account);
	}

	/**
	 * Sends an email using an injected dependency.
	 * @param  emailContent The content of the email
	 * to be sent.
	 */
	private async sendEmail(emailContent: any, account: any): Promise<{ info: any }> {
		const toEmail = emailContent.emailAddresses;
		const senderEmail = account.senderEmail;

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			host: account.host,
			port: account.port,
			secure: true,
			auth: {
				user: account.username,
				pass: account.password
			}
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			to: toEmail,
			from: senderEmail,
			subject: emailContent.emailSubject,
			text: emailContent.emailBody,
			html: emailContent.emailHtml
		});

		console.log(`Message sent: ${info.messageId}`);

		return info;
	}
}
