export default class AccessPriviledgeService {
   
   hasPriviledges(userId: any, query: { controllerId: string; actionId: string; } | null): { error: any; result: any; } | PromiseLike<{ error: any; result: any; }> {
      throw new Error("Method not implemented.");
   }
   
}