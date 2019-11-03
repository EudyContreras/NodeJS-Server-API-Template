import Vault from '../config/vault';

class RoleData {
   public type: string;
   public code: string;
   constructor(type: string, code: string) {
      this.type = type;
      this.code = code;
   }
}

const CODES = [...Vault.roles.CODES];

const ROOT = 'root'
const NONE = 'none';
const ADMIN = 'admin';
const GUEST = 'guest';
const USER = 'user';

const ACCESS_ROLES = [
   new RoleData(ROOT, CODES[0]),
   new RoleData(ADMIN, CODES[1]),
   new RoleData(USER, CODES[2]),
   new RoleData(GUEST, CODES[3])
];

const ALL = [ ROOT, ADMIN, GUEST, USER ];

export {
   ACCESS_ROLES,
   NONE,
   CODES,
   ADMIN,
   GUEST,
   USER,
   ALL
}

export default {
   ROOT, ADMIN, GUEST, USER 
};

