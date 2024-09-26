export type Competitor = {
	id: number;
	uid: string;
	type: string;
	order: number;
	homeAway: string;
	team: {
		$ref: string;
	};
	score: {
		$ref: string;
	};
	record: {
		$ref: string;
	};
	curatedRank: {
		current: number;
	};
	$ref: string;
};

export type CompetitorsResponse = {
	items: Competitor[];
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
};

export type CompetitorIds = {
	homeTeamId: number;
	awayTeamId: number;
};

export type Venue = {
	id: string;
	fullName: string;
	address: {
		city: string;
		state: string;
		zipCode: string;
	};
	capacity?: number;
	indoor: boolean;
	grass: boolean;
};

export type Event = {
	id: string;
	uid: string;
	date: string;
	name?: string;
	shortName?: string;
	season?: {
		year: number;
		type: number;
	};
	competitions: {
		id: string;
		date: string;
		type: {
			id: string;
			abbreviation: string;
		};
		timeValid: boolean;
		neutralSite: boolean;
		conferenceCompetition: boolean;
		playByPlayAvailable: boolean;
		recent: boolean;
		venue: Venue;
		competitors: Competitor[];
		status: {
			$ref: string;
		};
		broadcasts: {
			$ref: string;
		};
	}[];
};

export type Team = {
	id: string;
	uid: string;
	slug: string;
	location: string;
	name: string;
	nickname: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	color: string;
	alternateColor: string;
	isActive: boolean;
	isAllStar: boolean;
	logos: {
		href: string;
		alt: string;
		rel: string[];
		width: number;
		height: number;
	}[];
	venue: {
		id: string;
		fullName: string;
		address: {
			city: string;
			state: string;
			zipCode: string;
		};
		capacity?: number;
		indoor: boolean;
		grass: boolean;
	};
};

export type Score = {
	displayValue: string;
	value: number;
	winner: boolean;
};

export type Standing = {
	team: { id: string };
	stats: {
		name: string;
		displayValue: string;
	}[];
};

export type TeamLeaders = {
	abbreviation: string;
	id: string;
	name: string;
	type: string;
	categories: {
		abbreviation: string;
		displayName: string;
		name: string;
		shortDisplayName: string;
		leaders: {
			displayValue: string;
			value: number;
			athlete: {
				$ref: string;
			};
			team: {
				$ref: string;
			};
			statistics: {
				$ref: string;
			};
		}[];
	}[];
};

export interface SeasonLeaders {
	$ref: string;
	id: string;
	name: string;
	abbreviation: string;
	type: string;
	categories: {
		abbreviation: string;
		displayName: string;
		name: string;
		shortDisplayName: string;
		leaders: {
			displayValue: string;
			value: number;
			athlete: {
				$ref: string;
			};
			team: {
				$ref: string;
			};
			statistics: {
				$ref: string;
			};
		}[];
	}[];
}

export type Athlete = {
	uid: string;
	id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	displayName: string;
	shortName: string;
	weight: number;
	displayWeight: string;
	height: number;
	displayHeight: string;
	age: number;
	jersey: string;
	position: {
		name: string;
		displayName: string;
		abbreviation: string;
	};
	team: {
		$ref: string;
	};
	active: boolean;
	headshot: {
		href: string;
		alt: string;
	};
	college: {
		$ref: string;
	};
	birthPlace: {
		city: string;
		state: string;
		country: string;
	};
	slug: string;
	linked: boolean;
};
