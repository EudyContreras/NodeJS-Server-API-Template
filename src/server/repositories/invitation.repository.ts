import Invitation from '../entitymodel/entities/invitation.entity';
import { IInvitation } from '../entitymodel/models/invitation.model';

function dataTransferDocument(data: IInvitation): any {
	return {
		id: data.id,
		email: data.email,
		pending: data.pending,
		expired: data.expired,
		roleCode: data.roleCode,
		expirationTime: data.expirationTime
	};
}

/**
 * @description Data access layer Repository used
 * for interfacing with the invitation data.
 */
export default class InvitationRepository {

	private exclude: any;
	private options: any;

	constructor() {
		this.exclude = null;

		this.options = {
			new: true,
			upsert: false,
			useFindAndModify: false,
			runValidators: true
		};
	}

	public async hasInvitation(invitationId: string): Promise<boolean> {
		const count = await Invitation
			.countDocuments({ _id: invitationId })
			.exec();

		return count > 0;
	}

	public async hasInvitationWhere(query: any): Promise<boolean> {
		const count = await Invitation
			.countDocuments(query)
			.exec();

		return count > 0;
	}

	public async getAllInvitations(options = { dto: true }): Promise<IInvitation[] | any[]> {
		const invitations = await Invitation
			.find()
			.select(this.exclude)
			.exec();

		if (options.dto === true) {
			return invitations.map((x) => dataTransferDocument(x));
		}

		return invitations;
	}

	public async getAllInvitationsWhere(query: any, options = { dto: true }): Promise<IInvitation[] | any[]> {
		const invitations = await Invitation
			.find(query)
			.select(this.exclude)
			.exec();

		if (options.dto === true) {
			return invitations.map((x) => dataTransferDocument(x));
		}

		return invitations;
	}

	public async getInvitation(invitationId: string, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findById(invitationId)
			.select(this.exclude)
			.exec();

		if (options.dto === true && invitation != null) {
			return dataTransferDocument(invitation);
		}

		return invitation;
	}

	public async getInvitationWhere(criteria: any, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findOne(criteria)
			.select(this.exclude)
			.exec();

		if (options.dto === true && invitation != null) {
			return dataTransferDocument(invitation);
		}

		return invitation;
	}

	public async getFromInvitation(invitationId: string, select: any): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findById(invitationId)
			.select(select)
			.exec();

		return invitation;
	}

	public async insertInvitation(data: any, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = new Invitation(data);

		await invitation.validate();

		const saved = await invitation.save(this.options);

		if (options.dto === true && saved != null) {
			return dataTransferDocument(saved);
		}

		return saved;
	}

	public async updateInvitation(invitationId: string, update: any, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findByIdAndUpdate(invitationId, update, this.options)
			.select(this.exclude)
			.exec();

		if (options.dto === true && invitation != null) {
			return dataTransferDocument(invitation);
		}

		return invitation;
	}

	public async updateInvitationWhere(query: any, update: any, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findOneAndUpdate(query, update, this.options)
			.select(this.exclude)
			.exec();

		if (options.dto === true && invitation != null) {
			return dataTransferDocument(invitation);
		}

		return invitation;
	}

	public async deleteInvitation(invitationId: string, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findByIdAndDelete(invitationId)
			.exec();

		const result = invitation ? invitation : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async deleteInvitationWhere(query: any, options = { dto: true }): Promise<IInvitation | any> {
		const invitation = await Invitation
			.findOneAndDelete(query)
			.exec();

		const result = invitation ? invitation : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async clearAllWhere(query: any): Promise<any> {
		return await Invitation
			.deleteMany(query)
			.exec();
	}

	public async clearAll(): Promise<any> {
		return await Invitation
			.deleteMany({})
			.exec();
	}
}