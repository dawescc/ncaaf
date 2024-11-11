import { teams } from "@/data/teams";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDateTime(date: string | Date): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toLocaleString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZoneName: "short",
	});
}

export function getTeamSlug(id: number): string {
	const team = Object.values(teams).find((team) => parseInt(team.id) === id);
	return team ? team.slug : "-";
}

export function getTeamID(slug: string): number {
	const team = Object.values(teams).find((team) => team.slug === slug);
	return team ? parseInt(team.id) : 0;
}

interface Team {
	id: number;
	slug: string;
	location: string;
	name: string;
	nickname: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	color: string;
	alternateColor: string;
	conference: string;
}

const teamsById = new Map(Object.values(teams).map((team) => [team.id, team.slug]));

export function getTeam(identifier: string): Team | undefined {
	const team = teams[identifier] || teams[teamsById.get(identifier) || ""];
	return team && { ...team, id: parseInt(team.id, 10) };
}
