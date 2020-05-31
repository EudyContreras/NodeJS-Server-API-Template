
export default interface IAction {
	from?: string;
	type: string;
	payload: any | undefined | IAction ;
}