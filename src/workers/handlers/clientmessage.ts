import { logger } from '../commons';
import { clientMessages } from '../constants';

export const addMessageListening = async (): Promise<void> => {
	navigator.serviceWorker.onmessage = (event): void => {
		const command = event.data;

		logger.log('Client message received!', command);

		switch (command.type) {
			case clientMessages.UPDATE_AVAILABLE: {
				const message = JSON.parse(command);
				logger.log('Application has been updated in the background', message);
				break;
			}
		}
	};
};
