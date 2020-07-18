
export enum WorkerFeature {
    PERIODIC_SYNC,
    PUSH_MANAGER,
    SYNC
}

export const hasFeature = (registration: ServiceWorkerRegistration, feature: WorkerFeature): boolean => {
	switch (feature) {
		case WorkerFeature.PERIODIC_SYNC: {
			return ('periodicSync' in registration);
		}
		case WorkerFeature.PUSH_MANAGER: {
			return ('pushManager' in registration);
		}
		case WorkerFeature.SYNC: {
			return ('sync' in registration);
		}
	}
};