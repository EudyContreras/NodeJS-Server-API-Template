export class MongoDBException extends Error {
	action: string;
	document: string;
	message: string;

	constructor(document: string, action: string, message: string) {
		super(message);
		this.document = document;
		this.action = action;
		this.message = message;
	}
}
