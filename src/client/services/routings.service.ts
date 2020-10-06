export default class RoutingService {
	public getAll = async (): Promise<any> => ({
		routings: ['Users', 'Roles', 'Invitations', 'Priviledges'],
		error: null
	});
}
