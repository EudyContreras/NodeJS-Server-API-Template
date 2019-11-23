
export function randomString(length: number): string {
	const chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
	let pass = '';
	for (let x = 0; x < length; x++) {
		const index = Math.floor(Math.random() * chars.length);
		pass += chars.charAt(index);
	}
	return pass;
}