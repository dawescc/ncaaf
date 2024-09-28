const api = "http://sports.core.api.espn.com/v2/sports/football/leagues/college-football";

const base_score = "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard";

const scoreApi = (week: number): string => {
	if (week <= 0 || !Number.isInteger(week)) {
		throw new Error("Week must be a positive integer");
	}

	const params = new URLSearchParams({
		week: week.toString(),
		groups: "80",
	});

	return `${base_score}?${params.toString()}`;
};

export { api, scoreApi };
