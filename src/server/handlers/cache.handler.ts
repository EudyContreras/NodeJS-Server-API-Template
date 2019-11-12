export default class RedisCacheHandler {
   available(): boolean {
      return false;
   }
   async saveValues(key: string, value: any): Promise<{ result?: boolean, error?: any }> {
      return new Promise(() => {})
   }
   

}