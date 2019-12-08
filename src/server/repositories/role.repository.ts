import Role from '../entitymodel/entities/role.entity';

import { IRole } from '../entitymodel/models/role.model';

function dataTransferDocument(role: IRole): any {
	const { id, name, code, level } = role;
	return { id, name, code, level };
}

/**
 * @description Data access layer Repository used
 * for interfacing with the role data.
 */
export default class RoleRepository {

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

	public async hasRole(roleId: string): Promise<boolean> {
		const count = await Role
			.countDocuments({ _id: roleId })
			.exec();

		return count > 0;
	}

	public async hasRoleWhere(query: any): Promise<boolean> {
		const count = await Role
			.countDocuments(query)
			.exec();

		return count > 0;
	}

	public async getAllRoles(options = { dto: true }): Promise<IRole[] | any[]> {
		const roles = await Role
			.find()
			.select(this.exclude)
			.exec();

		if (options.dto === true) {
			return roles.map((x) => dataTransferDocument(x));
		}

		return roles;
	}

	public async getAllRolesWhere(query: any, options = { dto: true }): Promise<IRole[] | any[]> {
		const roles = await Role
			.find(query)
			.select(this.exclude)
			.exec();

		if (options.dto === true) {
			return roles.map((x) => dataTransferDocument(x));
		}

		return roles;
	}

	public async getRole(roleId: string, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findById(roleId)
			.select(this.exclude)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async getRoleWhere(criteria: any, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findOne(criteria)
			.select(this.exclude)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async getFromRole(roleId: string, select: any): Promise<IRole | any> {
		const role = await Role
			.findById(roleId)
			.select(select)
			.exec();

		const result = role ? role : null;

		return result;
	}

	public async insertRole(data: any, options = { dto: true }): Promise<IRole | any> {
		const role = new Role(data);

		await role.validate();

		const saved = await role.save(this.options);

		const result = saved ? saved : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async updateRole(roleId: string, update: any, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findByIdAndUpdate(roleId, update, this.options)
			.select(this.exclude)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async updateRoleWhere(query: any, update: any, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findOneAndUpdate(query, update, this.options)
			.select(this.exclude)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async deleteRole(roleId: string, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findByIdAndDelete(roleId)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async deleteRoleWhere(query: any, options = { dto: true }): Promise<IRole | any> {
		const role = await Role
			.findOneAndDelete(query)
			.exec();

		const result = role ? role : null;

		if (options.dto === true && result != null) {
			return dataTransferDocument(result);
		}

		return result;
	}

	public async clearAllWhere(query: any): Promise<any> {
		return await Role
			.deleteMany(query)
			.exec();
	}

	public async clearAll(): Promise<any> {
		return await Role
			.deleteMany({})
			.exec();
	}
}