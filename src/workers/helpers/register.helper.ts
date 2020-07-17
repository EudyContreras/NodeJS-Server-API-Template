import { hasSupport, SupportTarget } from './support.helper';

export const onRegistration = async (listener): Promise<void> => {
	if (!hasSupport(SupportTarget.SERVICE_WORKER)) return;

	const registration = await navigator.serviceWorker.ready;

	if (!registration) return;

	listener(registration);
};