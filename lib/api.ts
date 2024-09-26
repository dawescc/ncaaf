const baseUrl = "http://sports.core.api.espn.com/v2/sports/football/leagues/college-football";

type SeasonId = number;
type TeamId = number;
type AthleteId = number;
type EventId = number;

type ApiFunction = (...args: (SeasonId | TeamId | AthleteId | EventId)[]) => string;

interface ApiObject {
	toString: () => string;
	seasons: string;
	season: (seasonId: SeasonId) => string;
	weeks: (seasonId: SeasonId) => string;
	team: (seasonId: SeasonId, teamId: TeamId) => string;
	athlete: (seasonId: SeasonId, athleteId: AthleteId) => string;
	event: (eventId: EventId) => string;
	[key: string]: string | ApiFunction;
}

const api: ApiObject = {
	toString: () => baseUrl,
	seasons: `${baseUrl}/seasons/`,
	season: (seasonId) => `${baseUrl}/seasons/${seasonId}`,
	weeks: (seasonId) => `${baseUrl}/seasons/${seasonId}/weeks`,
	team: (seasonId, teamId) => `${api.season(seasonId)}/teams/${teamId}`,
	athlete: (seasonId, athleteId) => `${api.season(seasonId)}/athlete/${athleteId}`,
	event: (eventId) => `${baseUrl}/events/${eventId}/competitions/${eventId}`,
};

interface TeamEndpoints {
	stats: (seasonId: SeasonId, teamId: TeamId) => string;
	leaders: (seasonId: SeasonId, teamId: TeamId) => string;
	venue: (seasonId: SeasonId, teamId: TeamId) => string;
	college: (seasonId: SeasonId, teamId: TeamId) => string;
	roster: (seasonId: SeasonId, teamId: TeamId) => string;
	record: {
		all: (seasonId: SeasonId, teamId: TeamId) => string;
		overall: (seasonId: SeasonId, teamId: TeamId) => string;
		home: (seasonId: SeasonId, teamId: TeamId) => string;
		away: (seasonId: SeasonId, teamId: TeamId) => string;
		conf: (seasonId: SeasonId, teamId: TeamId) => string;
	};
}

const team: TeamEndpoints = {
	stats: (seasonId, teamId) => `${api.team(seasonId, teamId)}/statistics`,
	leaders: (seasonId, teamId) => `${api.team(seasonId, teamId)}/leaders`,
	venue: (seasonId, teamId) => `${api.team(seasonId, teamId)}/venue`,
	college: (seasonId, teamId) => `${api.team(seasonId, teamId)}/college`,
	roster: (seasonId, teamId) => `${api.team(seasonId, teamId)}/athletes`,
	record: {
		all: (seasonId, teamId) => `${api.team(seasonId, teamId)}/record`,
		overall: (seasonId, teamId) => `${api.team(seasonId, teamId)}/record/0`,
		home: (seasonId, teamId) => `${api.team(seasonId, teamId)}/record/1`,
		away: (seasonId, teamId) => `${api.team(seasonId, teamId)}/record/2`,
		conf: (seasonId, teamId) => `${api.team(seasonId, teamId)}/record/3`,
	},
};

interface EventEndpoints {
	status: (eventId: EventId) => string;
	competitors: (eventId: EventId) => string;
}

const event: EventEndpoints = {
	status: (eventId) => `${api.event(eventId)}/status`,
	competitors: (eventId) => `${api.event(eventId)}/competitors`,
};

export { api, team, event };
