import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleString("en-US", {
		weekday: "short",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
	});
};
