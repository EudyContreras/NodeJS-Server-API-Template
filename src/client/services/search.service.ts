
import axios from 'axios';

type Error = any | undefined | null;

type RequestData = {
	params: any;
};

export default class RoutingService {

	public performSearch = async (prefix: string): Promise<{ result?: any; error?: Error }> => {
		try {
			const data: RequestData = {
				params: { searchText: prefix }
			};
			const endpoint = process.env.REACT_APP_SERVER_API_URL;
			const response = await axios.get(`${endpoint}/search`, data);
			return { result: response.data.content };
		} catch(error) {
			return { error: error };
		}
	};
}