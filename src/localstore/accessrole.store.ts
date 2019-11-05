import vault from '../config/vault';

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

const CODES = [...vault.roles.CODES];

const ROOT = 'root'
const ADMIN = 'admin';
const GUEST = 'guest';
const USER = 'user';
const NONE = 'none';

const ACCESS_ROLES = [
   new RoleData(ROOT, CODES[0], vault.roles.CLEARANCE.ROOT),
   new RoleData(ADMIN, CODES[1], vault.roles.CLEARANCE.VERY_HIGH),
   new RoleData(USER, CODES[2], vault.roles.CLEARANCE.NORMAL),
   new RoleData(GUEST, CODES[3], vault.roles.CLEARANCE.LOW)
];

const ALL = [ ROOT, ADMIN, GUEST, USER ];

export {
   ACCESS_ROLES,
   NONE,
   ROOT,
   CODES,
   ADMIN,
   GUEST,
   USER,
   ALL
}

export default {
   ROOT, ADMIN, GUEST, USER, ACCESS_ROLES
};

