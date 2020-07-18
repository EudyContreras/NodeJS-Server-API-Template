/* eslint-disable @typescript-eslint/consistent-type-assertions */

export enum Permission {
    PUSH,
    NOTIFICATIONS,
    BACKGROUND_SYNC,
    BACKGROUND_SYNC_PERIODIC
};

export const AccessStatus = {
	GRANTED: 'granted',
	DENIED: 'denied',
	PROMPT: 'prompt'
};

export async function requestPermission(type: Permission): Promise<string> {
	switch (type) {
		case Permission.PUSH: {
			return (await navigator.permissions.query({
				name: 'push'
			})).state;
		}
		case Permission.NOTIFICATIONS: {
			return (await navigator.permissions.query({
				name: 'notifications'
			})).state;
		}
		case Permission.BACKGROUND_SYNC: {
			return (await navigator.permissions.query({
				name: 'background-sync'
			})).state;
		}
		case Permission.BACKGROUND_SYNC_PERIODIC: {
			return (await navigator.permissions.query({
				name: <any>'periodic-background-sync'
			})).state;
		}
	}
}

export function registerNotification(callback: PermissionCallback): void {
	Notification.requestPermission(permission => {
		if (permission === AccessStatus.GRANTED){ 
			callback.onGranted(); 
		}
		else {
            callback.onDenied?.('Permission was not granted.');
		};
	});
}