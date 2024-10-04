type ParamType = "string" | "number";

interface Param {
	name: string;
	type: ParamType;
	required: boolean;
}

interface Route {
	path: string;
	base: "core" | "siteV2" | "siteV3";
	desc: string;
	params?: Param[];
}

type ParamValues = Record<string, string | number>;

class Api {
	private bases = {
		core: new URL("https://sports.core.api.espn.com/v2/sports/football/leagues/college-football"),
		siteV2: new URL("https://site.api.espn.com/apis/site/v2/sports/football/college-football"),
		siteV3: new URL("https://site.web.api.espn.com/apis/site/v3/sports/football/college-football"),
	};

	private buildUrl(route: Route, params?: ParamValues): URL {
		const url = new URL(route.path, this.bases[route.base]);

		if (params && route.params) {
			for (const param of route.params) {
				if (param.name in params) {
					url.searchParams.append(param.name, params[param.name].toString());
				} else if (param.required) {
					throw new Error(`Required parameter '${param.name}' is missing`);
				}
			}
		}

		return url;
	}

	season = {
		list: () => this.buildUrl({ path: "/seasons", base: "core", desc: "List all seasons" }),
		info: (season: number) => this.buildUrl({ path: `/seasons/${season}`, base: "core", desc: "Get season details" }),
		weeks: (season: number) => this.buildUrl({ path: `/seasons/${season}/types/2/weeks`, base: "core", desc: "List weeks in a season" }),
		statLeaders: (season: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/leaders`, base: "core", desc: "List statistical leaders for a season" }),
		leadingTeams: (params?: ParamValues) =>
			this.buildUrl(
				{
					path: "/teamleaders",
					base: "siteV3",
					desc: "List leading teams for a season",
					params: [
						{ name: "limit", type: "number", required: false },
						{ name: "groups", type: "number", required: false },
						{ name: "sort", type: "string", required: false },
					],
				},
				params
			),
	};

	week = {
		dates: () => this.buildUrl({ path: "/calendar/ondays", base: "core", desc: "List dates for each game week" }),
		events: (params: ParamValues) =>
			this.buildUrl(
				{
					path: "/scoreboard",
					base: "siteV2",
					desc: "List events for a given week",
					params: [
						{ name: "week", type: "number", required: true },
						{ name: "groups", type: "number", required: false },
					],
				},
				params
			),
		rankings: (season: number, week: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/weeks/${week}/rankings/1`, base: "core", desc: "List AP Top 25 for a week" }),
	};

	group = {
		list: (season: number) => this.buildUrl({ path: `/seasons/${season}/types/2/groups/80/children`, base: "core", desc: "List conferences in a season" }),
		info: (season: number, confId: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/groups/${confId}`, base: "core", desc: "Get group information" }),
		standings: (params: ParamValues) =>
			this.buildUrl(
				{
					path: "/standings",
					base: "siteV3",
					desc: "Get group standings",
					params: [
						{ name: "groups", type: "number", required: true },
						{ name: "level", type: "number", required: false },
						{ name: "sort", type: "string", required: false },
						{ name: "startingseason", type: "number", required: false },
					],
				},
				params
			),
		teams: (season: number, confId: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/groups/${confId}/teams`, base: "core", desc: "List teams in a group" }),
		teamLeaders: (params: ParamValues) =>
			this.buildUrl(
				{
					path: "/teamleaders",
					base: "siteV3",
					desc: "Get team leaders in a group",
					params: [
						{ name: "groups", type: "number", required: true },
						{ name: "limit", type: "number", required: false },
						{ name: "sort", type: "string", required: false },
					],
				},
				params
			),
	};

	team = {
		collegeInfo: (teamId: number) => this.buildUrl({ path: `/colleges/${teamId}`, base: "core", desc: "Get college information" }),
		info: (teamId: number) => this.buildUrl({ path: `/teams/${teamId}`, base: "core", desc: "Get team information" }),
		record: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/teams/${teamId}/record`, base: "core", desc: "Get team record" }),
		roster: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/teams/${teamId}/athletes`, base: "core", desc: "Get team roster" }),
		stats: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/teams/${teamId}/statistics`, base: "core", desc: "Get team statistics" }),
		statLeaders: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/types/2/teams/${teamId}/leaders`, base: "core", desc: "Get team statistical leaders" }),
		coaches: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/teams/${teamId}/coaches`, base: "core", desc: "Get team coaches" }),
		schedule: (season: number, teamId: number) =>
			this.buildUrl({ path: `/seasons/${season}/teams/${teamId}/events`, base: "core", desc: "Get team schedule" }),
		scheduleRefs: (teamId: number) => this.buildUrl({ path: `/teams/${teamId}/schedule`, base: "siteV2", desc: "Get team schedule references" }),
	};

	event = {
		info: (eventId: number) => this.buildUrl({ path: `/events/${eventId}`, base: "core", desc: "Get event information" }),
		betweenDates: (params: ParamValues) =>
			this.buildUrl(
				{
					path: "/events",
					base: "core",
					desc: "List events between dates",
					params: [
						{ name: "limit", type: "number", required: false },
						{ name: "dates", type: "string", required: true },
					],
				},
				params
			),
	};

	competition = {
		info: (eventId: number) => this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}`, base: "core", desc: "Get competition information" }),
		situation: (eventId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/situation`, base: "core", desc: "Get competition situation" }),
		statLeaders: (eventId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/leaders`, base: "core", desc: "Get competition statistical leaders" }),
		status: (eventId: number) => this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/status`, base: "core", desc: "Get competition status" }),
		plays: (eventId: number) => this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/plays`, base: "core", desc: "Get competition plays" }),
		drives: (eventId: number) => this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/drives`, base: "core", desc: "Get competition drives" }),
		broadcast: (eventId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/broadcasts`, base: "core", desc: "Get competition broadcast information" }),
		participants: (eventId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/competitors`, base: "core", desc: "Get competition participants" }),
		participantScore: (eventId: number, teamId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/competitors/${teamId}/score`, base: "core", desc: "Get participant score" }),
		participantBoxScore: (eventId: number, teamId: number) =>
			this.buildUrl({
				path: `/events/${eventId}/competitions/${eventId}/competitors/${teamId}/linescores`,
				base: "core",
				desc: "Get participant box score",
			}),
		participantStats: (eventId: number, teamId: number) =>
			this.buildUrl({
				path: `/events/${eventId}/competitions/${eventId}/competitors/${teamId}/statistics`,
				base: "core",
				desc: "Get participant statistics",
			}),
		participantStatLeaders: (eventId: number, teamId: number) =>
			this.buildUrl({
				path: `/events/${eventId}/competitions/${eventId}/competitors/${teamId}/leaders`,
				base: "core",
				desc: "Get participant statistical leaders",
			}),
		participantRoster: (eventId: number, teamId: number) =>
			this.buildUrl({ path: `/events/${eventId}/competitions/${eventId}/competitors/${teamId}/roster`, base: "core", desc: "Get participant roster" }),
	};

	misc = {
		rankings: () => this.buildUrl({ path: "/rankings/1", base: "core", desc: "Get current AP Top 25" }),
		liveScores: (params?: ParamValues) =>
			this.buildUrl(
				{
					path: "/scoreboard",
					base: "siteV2",
					desc: "Get live scores",
					params: [{ name: "groups", type: "number", required: false }],
				},
				params
			),
		news: (params?: ParamValues) =>
			this.buildUrl(
				{
					path: "/news",
					base: "siteV2",
					desc: "Get news",
					params: [
						{ name: "team", type: "number", required: false },
						{ name: "groups", type: "number", required: false },
						{ name: "dates", type: "string", required: false },
						{ name: "limit", type: "number", required: false },
					],
				},
				params
			),
	};
}

const api = new Api();

export { api };
