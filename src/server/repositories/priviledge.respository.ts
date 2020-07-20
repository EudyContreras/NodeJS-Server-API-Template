import Priviledge from '../entitymodel/entities/priviledge.entity';
import { IPriviledge } from '../entitymodel/models/priviledge.model';

export class PriviledgeDTO {
	public userId: string;
	public permissions: string[];
	public controller: string;
	constructor(userId: string, permissions: string[], controller: string) {
		this.userId = userId;
		this.permissions = permissions;
		this.controller = controller;
	}
}

function dataTransferDocument(data: IPriviledge): PriviledgeDTO {
	const { userId, permissions, controller } = data;
	return new PriviledgeDTO(userId, permissions, controller);
}

/**
 * @description Data access layer Repository used
 * for interfacing with the priviledge data.
 */
export default class PriviledgeRepository {
	private exclude: any;
	private options: any;

	constructor() {
		this.exclude = null;

		this.options = {
			new: true,
			upsert: true,
			useFindAndModify: false,
			runValidators: true
		};
	}

	public async hasPriviledge(priviledgeId: string): Promise<boolean> {
		const count = await Priviledge.countDocuments({ _id: priviledgeId }).exec();

		return count > 0;
	}

	public async hasPriviledgeWhere(query: any): Promise<boolean> {
		const count = await Priviledge.countDocuments(query).exec();

		return count > 0;
	}

	public async getAllPriviledges(options = { dto: true }): Promise<IPriviledge[] | PriviledgeDTO[]> {
		const priviledges = await Priviledge.find().select(this.exclude).exec();

		if (options.dto === true) {
			return priviledges.map((x) => dataTransferDocument(x));
		}

		return priviledges;
	}

	public async getAllPriviledgesWhere(query: any, options = { dto: true }): Promise<IPriviledge[] | PriviledgeDTO[]> {
		const priviledges = await Priviledge.find(query).select(this.exclude).exec();

		if (options.dto === true) {
			return priviledges.map((x) => dataTransferDocument(x));
		}

		return priviledges;
	}

	public async getPriviledge(
		priviledgeId: string,
		options = { dto: true }
	): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findById(priviledgeId).select(this.exclude).exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async getPriviledgeWhere(criteria: any, options = { dto: true }): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findOne(criteria).select(this.exclude).exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async getFromPriviledge(priviledgeId: string, select: any): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findById(priviledgeId).select(select).exec();

		const result = priviledge || null;

		return result;
	}

	public async insertPriviledge(data: any, options = { dto: true }): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = new Priviledge(data);

		await priviledge.validate();

		const saved = await priviledge.save(this.options);

		const result = saved || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async updateOrInsertPriviledge(query: any, update: any): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.updateOne(query, update, this.options).select(this.exclude);

		return priviledge;
	}

	public async updatePriviledge(
		priviledgeId: string,
		update: any,
		options = { dto: true }
	): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findByIdAndUpdate(priviledgeId, update, this.options)
			.select(this.exclude)
			.exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async updatePriviledgeWhere(
		query: any,
		update: any,
		options = { dto: true }
	): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findOneAndUpdate(query, update, this.options).select(this.exclude).exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async deletePriviledge(
		priviledgeId: string,
		options = { dto: true }
	): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findByIdAndDelete(priviledgeId).exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async deletePriviledgeWhere(query: any, options = { dto: true }): Promise<IPriviledge | PriviledgeDTO | null> {
		const priviledge = await Priviledge.findOneAndDelete(query).exec();

		const result = priviledge || null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async clearAllWhere(query: any): Promise<any> {
		return await Priviledge.deleteMany(query).exec();
	}

	public async clearAll(): Promise<any> {
		return await Priviledge.deleteMany({}).exec();
	}
}
