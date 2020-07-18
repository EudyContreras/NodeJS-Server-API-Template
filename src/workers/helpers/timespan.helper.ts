

export const years = (count: number): number => count * months(12);

export const months = (count: number): number => count * days(30);

export const weeks = (count: number): number => count * days(7);

export const days = (count: number): number => count * hours(24);

export const hours = (count: number): number => count * minutes(60);

export const minutes = (count: number): number => count * 60;

export const seconds = (count: number): number => count * 1000;
