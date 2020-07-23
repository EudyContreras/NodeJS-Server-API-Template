import EmailHandler from '../handlers/email.handler';

export default class NotificationService {
	public async sendInvitationEmail(invite: any): Promise<boolean> {
		return false;
	}

	public canSendEmails(): boolean {
		throw new Error('Method not implemented.');
	}

	public async sendPasswordRecoveryEmail(email: any, randomPassword: string): Promise<boolean> {
		if (!this.canSendEmails()) {
			return Promise.resolve(true).then();
		}
		throw new Error('Method not implemented.');
	}
}
