


export const days = (count: number): number => hours(count * 24);
export const years = (count: number): number => months(count * 12);
export const weeks = (count: number): number => days(count * 7);
export const months = (count: number): number => days(count * 30);
export const hours = (count: number): number => minutes(count * 60);
export const minutes = (count: number): number => 1 * 24 * count * 60;
export const seconds = (count: number): number => count * 1000;
