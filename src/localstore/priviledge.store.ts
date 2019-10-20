import Vault from '../config/vault';

class PriviledgeData {
   public type: string;
   public code: string;
   constructor(type: string, code: string) {
      this.type = type;
      this.code = code;
   }
}

const CODES = [...Vault.priviledges.CODES];

const READ = 'read';
const CREATE = 'create';
const UPDATE = 'update';
const DELETE = 'delete';

const PRIVILEDGES = [
   new PriviledgeData(READ, CODES[0]),
   new PriviledgeData(CREATE, CODES[1]),
   new PriviledgeData(UPDATE, CODES[2]),
   new PriviledgeData(DELETE, CODES[3]),
];

export default Object.freeze({
   PRIVILEDGES,
   READ,
   CREATE,
   UPDATE,
   DELETE,
   ALL: [
      READ,
      CREATE,
      UPDATE,
      DELETE
   ]
});