import axios from 'axios';

export default class RoutingService {

   getAll = async () => {
      return { routings: ['Users', 'Roles', 'Invitations', 'Priviledges'], error: null };
   }
}