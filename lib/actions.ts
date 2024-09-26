"use server";

import { APIStanding, APITeamLeaders, Athlete, Competitor, CompetitorIds, CompetitorsResponse, EventInfo, ScoreResponse, Team } from "@/lib/types";

// returns current season: number
export async function getCurrentSeasonYear(): Promise<number> {
	try {
		const response = await fetch("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons", {
			next: { revalidate: 86400 }, // Cache for 24 hours
		});

		if (!response.ok) {
			throw new Error("Failed to fetch season data");
		}

		const data = await response.json();

		if (!data.items || data.items.length === 0) {
			throw new Error("No season data available");
		}

		const seasonUrl = data.items[0].$ref;
		const seasonYear = parseInt(seasonUrl.match(/seasons\/(\d{4})/)?.[1] || "", 10);

		if (isNaN(seasonYear)) {
			throw new Error("Failed to parse season year");
		}

		return seasonYear;
	} catch (error) {
		console.error("Error fetching current season year:", error);
		throw error;
	}
}

// returns if event is completed: boolean
export async function isEventCompleted(eventId: number): Promise<boolean> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}/competitions/${eventId}/status`;
		const response = await fetch(url, {
			next: { revalidate: 60 }, // Cache for 1 minute, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch event status");
		}

		const data = await response.json();

		if (!data.type || typeof data.type.completed !== "boolean") {
			throw new Error("Invalid event status data");
		}

		return data.type.completed;
	} catch (error) {
		console.error(`Error checking if event ${eventId} is completed:`, error);
		throw error;
	}
}

// gets event information: json
export async function getEventInfo(eventId: number): Promise<EventInfo> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}/competitions/${eventId}`;
		const response = await fetch(url, {
			next: { revalidate: 60 }, // Cache for 1 minute, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch event information");
		}

		const data: EventInfo = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching information for event ${eventId}:`, error);
		throw error;
	}
}

// gets event data: string
export async function getEventDate(eventId: number): Promise<string> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}`;
		const response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch event information");
		}

		const data = await response.json();
		return data.date;
	} catch (error) {
		console.error(`Error fetching date for event ${eventId}:`, error);
		throw error;
	}
}

// returns if event time is valid: boolean
export async function isEventTimeValid(eventId: number): Promise<boolean> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}`;
		const response = await fetch(url, {
			next: { revalidate: 60 }, // Cache for 1 minute, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch event information");
		}

		const data = await response.json();
		return data.timeValid;
	} catch (error) {
		console.error(`Error fetching timeValid for event ${eventId}:`, error);
		throw error;
	}
}

// returns the ids of each of the competitors in a given event id: number
export async function getEventCompetitors(eventId: number): Promise<CompetitorIds> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}/competitions/${eventId}/competitors`;
		const response = await fetch(url, {
			next: { revalidate: 60 }, // Cache for 1 minute, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch event competitors");
		}

		const data: CompetitorsResponse = await response.json();

		let homeTeamId: number | undefined;
		let awayTeamId: number | undefined;

		data.items.forEach((competitor: Competitor) => {
			if (competitor.homeAway === "home") {
				homeTeamId = competitor.id;
			} else if (competitor.homeAway === "away") {
				awayTeamId = competitor.id;
			}
		});

		if (!homeTeamId || !awayTeamId) {
			throw new Error("Failed to identify home and away teams");
		}

		return { homeTeamId, awayTeamId };
	} catch (error) {
		console.error(`Error fetching competitors for event ${eventId}:`, error);
		throw error;
	}
}

// returns team info: json
export async function getTeamInfo(teamId: number): Promise<Team> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/teams/${teamId}`;
		const response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch team information");
		}

		const data: Team = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching information for team ${teamId}:`, error);
		throw error;
	}
}

// returns rank or null: number
export async function getTeamRank(teamId: number): Promise<number | null> {
	try {
		const url = `https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}`;
		const response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch team data");
		}

		const data = await response.json();

		// Check if the rank property exists and is a number
		if (data.team && typeof data.team.rank === "number") {
			return data.team.rank;
		} else {
			return null;
		}
	} catch (error) {
		console.error(`Error fetching rank for team ${teamId}:`, error);
		throw error;
	}
}

// returns a teams score in a given game
export async function getScore(eventId: number, teamId: number): Promise<number> {
	try {
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/events/${eventId}/competitions/${eventId}/competitors/${teamId}/score`;
		const response = await fetch(url, {
			next: { revalidate: 60 }, // Cache for 1 minute, adjust as needed for live games
		});

		if (!response.ok) {
			throw new Error("Failed to fetch score data");
		}

		const data: ScoreResponse = await response.json();

		// Convert displayValue to a number
		const score = parseInt(data.displayValue, 10);

		// Check if the conversion was successful
		if (isNaN(score)) {
			throw new Error("Invalid score value");
		}

		return score;
	} catch (error) {
		console.error(`Error fetching score for event ${eventId}, team ${teamId}:`, error);
		throw error;
	}
}

// returns conference standings
export async function getConferenceStandings(conf_id: number): Promise<APIStanding[]> {
	const response = await fetch(
		`https://site.web.api.espn.com/apis/v2/sports/football/college-football/standings?&group=${conf_id}&level=3&sort=leaguewinpercent%3Adesc%2Cvsconf_wins%3Adesc%2Cvsconf_gamesbehind%3Aasc%2Cvsconf_playoffseed%3Aasc%2Cwins%3Adesc%2Closses%3Adesc%2Cplayoffseed%3Aasc%2Calpha%3Aasc&startingseason=2004`
	);
	const data: { standings: { entries: APIStanding[] } } = await response.json();
	return data.standings.entries;
}

export async function getTeamLeaders(teamId: number): Promise<APITeamLeaders> {
	try {
		const season = await getCurrentSeasonYear();
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${season}/types/2/teams/${teamId}/leaders`;
		const response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch team leaders");
		}

		const data: APITeamLeaders = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching leaders for team ${teamId}:`, error);
		throw error;
	}
}

export async function getAthleteInfo(athleteId: number): Promise<Athlete> {
	try {
		const season = await getCurrentSeasonYear();
		const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/college-football/seasons/${season}/athletes/${athleteId}`;
		const response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour, adjust as needed
		});

		if (!response.ok) {
			throw new Error("Failed to fetch athlete information");
		}

		const data: Athlete = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching information for athlete ${athleteId}:`, error);
		throw error;
	}
}
