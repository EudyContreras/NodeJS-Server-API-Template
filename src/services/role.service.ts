export default class AccessRoleService {
   getRoleByCode(roleCode: string): { error: any; result: any; } | PromiseLike<{ error: any; result: any; }> {
      throw new Error("Method not implemented.");
   }
   getUserRole(userId: string): { error: any; result: any; } | PromiseLike<{ error: any; result: any; }> {
      throw new Error("Method not implemented.");
   }
   async createAccessRole(role: any): Promise<any> {

      return { result: null, error: null }
   }
}