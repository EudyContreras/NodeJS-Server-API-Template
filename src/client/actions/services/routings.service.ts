
export default class RoutingService {

	public getAll = async (): Promise<any> => {
		return { routings: ['Users', 'Roles', 'Invitations', 'Priviledges'], error: null };
	}
}