const wait = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time));

async function http(url, params, delay = 1000): Promise<Response | undefined> {
	return fetch(url, params).catch((error: Error) => {
		// wait 1 second then increase the delay (fibonacci style)
		return wait(delay).then(() => http(url, params, delay * 21/13));
	});
}