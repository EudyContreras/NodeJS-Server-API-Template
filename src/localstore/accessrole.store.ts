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

const NONE = 'none';
const ADMIN = 'admin';
const GUEST = 'guest';
const USER = 'user';

const ACCESS_ROLES = [
   new RoleData(ADMIN, CODES[0]),
   new RoleData(USER, CODES[1]),
   new RoleData(GUEST, CODES[2])
];

export default Object.freeze({
   ACCESS_ROLES,
   NONE,
   CODES,
   ADMIN,
   GUEST,
   USER,
   ALL: [
      ADMIN,
      GUEST,
      USER,
   ]
})

