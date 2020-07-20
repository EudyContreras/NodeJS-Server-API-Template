import config from '../../configs/config.server';

class RoleData {
	public type: string;
	public code: string;
	public level: number;
	constructor(type: string, code: string, level: number) {
		this.type = type;
		this.code = code;
		this.level = level;
	}
}

const CODES = [...config.roles.CODES];

const ROOT = 'root';
const ADMIN = 'admin';
const GUEST = 'guest';
const USER = 'user';
const NONE = 'none';

const ACCESS_ROLES = [
	new RoleData(ROOT, CODES[0], config.roles.CLEARANCE.ROOT),
	new RoleData(ADMIN, CODES[1], config.roles.CLEARANCE.VERY_HIGH),
	new RoleData(USER, CODES[2], config.roles.CLEARANCE.NORMAL),
	new RoleData(GUEST, CODES[3], config.roles.CLEARANCE.LOW)
];

const ALL = [ROOT, ADMIN, GUEST, USER];

export { ACCESS_ROLES, NONE, ROOT, CODES, ADMIN, GUEST, USER, ALL };

export default {
	ROOT,
	ADMIN,
	GUEST,
	USER,
	ACCESS_ROLES
};
