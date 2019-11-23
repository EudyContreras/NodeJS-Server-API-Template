
export default class RoutingService {

   public getAll = async () => {
      return { routings: ['Users', 'Roles', 'Invitations', 'Priviledges'], error: null };
   }
}