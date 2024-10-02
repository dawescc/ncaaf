/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ScoreBoardEvent {
	season: {
		year: number;
		type: number;
		slug: string;
	};
	uid: string;
	shortName: string;
	id: string;
	status: {
		displayClock: string;
		period: number;
		clock: number;
		type: {
			detail: string;
			id: string;
			shortDetail: string;
			description: string;
			completed: boolean;
			name: string;
			state: "pre" | "in" | "post";
		};
	};
	week: {
		number: number;
	};
	date: string;
	links: Array<{
		isPremium: boolean;
		rel: string[];
		href: string;
		language: string;
		text: string;
		shortText: string;
		isExternal: boolean;
	}>;
	weather?: {
		temperature: number;
		displayValue: string;
		highTemperature: number;
		conditionId: string;
		link: {
			isPremium: boolean;
			rel: string[];
			href: string;
			language: string;
			text: string;
			shortText: string;
			isExternal: boolean;
		};
	};
	competitions: Array<{
		status: {
			isTBDFlex?: boolean;
			displayClock: string;
			period: number;
			clock: number;
			type: {
				detail: string;
				id: string;
				shortDetail: string;
				description: string;
				completed: boolean;
				name: string;
				state: "pre" | "in" | "post";
			};
		};
		leaders?: Array<{
			abbreviation: string;
			leaders: Array<{
				displayValue: string;
				value: number;
				athlete: {
					displayName: string;
					jersey: string;
					shortName: string;
					id: string;
					position: {
						abbreviation: string;
					};
					active: boolean;
					fullName: string;
					links: Array<{
						rel: string[];
						href: string;
					}>;
					team: {
						id: string;
					};
					headshot: string;
				};
				team: {
					id: string;
				};
			}>;
			displayName: string;
			name: string;
			shortDisplayName: string;
		}>;
		situation?: {
			distance: number;
			down: number;
			possessionText: string;
			isRedZone: boolean;
			yardLine: number;
			lastPlay: {
				end: {
					team: {
						id: string;
					};
					yardLine: number;
				};
				start: {
					team: {
						id: string;
					};
					yardLine: number;
				};
				id: string;
				scoreValue: number;
				probability: {
					homeWinPercentage: number;
					awayWinPercentage: number;
					secondsLeft: number;
					tiePercentage: number;
				};
				drive: {
					start: {
						text: string;
						yardLine: number;
					};
					timeElapsed: {
						displayValue: string;
					};
					description: string;
				};
				text: string;
				team: {
					id: string;
				};
				type: {
					id: string;
					text: string;
					abbreviation: string;
				};
				statYardage: number;
				athletesInvolved: Array<{
					displayName: string;
					jersey: string;
					shortName: string;
					id: string;
					position: string;
					fullName: string;
					links: Array<{
						rel: string[];
						href: string;
					}>;
					team: {
						id: string;
					};
					headshot: string;
				}>;
			};
			downDistanceText: string;
			shortDownDistanceText: string;
			homeTimeouts: number;
			awayTimeouts: number;
		};
		timeValid: boolean;
		conferenceCompetition: boolean;
		neutralSite: boolean;
		type: {
			id: string;
			abbreviation: string;
		};
		recent: boolean;
		geoBroadcasts: Array<{
			market: {
				id: string;
				type: string;
			};
			lang: string;
			type: {
				id: string;
				shortName: string;
			};
			region: string;
			media: {
				darkLogo?: string;
				shortName: string;
				logo: string;
			};
		}>;
		id: string;
		date: string;
		competitors: Array<{
			uid: string;
			score: string;
			id: string;
			order: number;
			linescores?: Array<{
				value: number;
			}>;
			homeAway: "home" | "away";
			curatedRank: {
				current: number;
			};
			team: {
				id: string;
				isActive: boolean;
				uid: string;
				abbreviation: string;
				color: string;
				alternateColor: string;
				location: string;
				logo: string;
				links: Array<{
					isExternal: boolean;
					isPremium: boolean;
					rel: string[];
					href: string;
					text: string;
				}>;
				venue: {
					id: string;
				};
				shortDisplayName: string;
				conferenceId: string;
				name: string;
				displayName: string;
			};
			type: string;
			statistics: any[];
			records: Array<{
				abbreviation?: string;
				name: string;
				type: string;
				summary: string;
			}>;
			winner?: boolean;
		}>;
		uid: string;
		groups: {
			isConference: boolean;
			id: string;
			name: string;
			shortName: string;
		};
		playByPlayAvailable: boolean;
		venue: {
			id: string;
			fullName: string;
			indoor: boolean;
			address: {
				state: string;
				city: string;
			};
		};
		format: {
			regulation: {
				periods: number;
			};
		};
		broadcast: string;
		startDate: string;
		notes: any[];
		broadcasts: Array<{
			names: string[];
			market: string;
		}>;
		attendance?: number;
		odds?: Array<{
			spread: number;
			provider: {
				id: string;
				name: string;
				priority: number;
			};
			details: string;
			awayTeamOdds: {
				team: {
					abbreviation: string;
					id: string;
					uid: string;
					name: string;
					displayName: string;
					logo: string;
				};
				favorite: boolean;
				underdog: boolean;
			};
			open: {
				under: {
					value: number;
					displayValue: string;
					fraction: string;
					decimal: number;
					american: string;
					alternateDisplayValue: string;
				};
				over: {
					value: number;
					displayValue: string;
					fraction: string;
					decimal: number;
					american: string;
					alternateDisplayValue: string;
				};
				total: {
					value: number;
					displayValue: string;
					fraction: string;
					decimal: number;
					american: string;
					alternateDisplayValue: string;
				};
			};
			current: {
				under: {
					value: number;
					displayValue: string;
					fraction: string;
					decimal: number;
					american: string;
					alternateDisplayValue: string;
				};
				over: {
					value: number;
					displayValue: string;
					fraction: string;
					decimal: number;
					american: string;
					alternateDisplayValue: string;
				};
				total: {
					american: string;
					alternateDisplayValue: string;
				};
			};
			homeTeamOdds: {
				team: {
					abbreviation: string;
					id: string;
					uid: string;
					name: string;
					displayName: string;
					logo: string;
				};
				favorite: boolean;
				underdog: boolean;
			};
			overUnder: number;
		}>;
		headlines?: Array<{
			shortLinkText: string;
			type: string;
			description: string;
			video?: Array<{
				source: string;
				thumbnail: string;
				id: number;
				tracking: {
					trackingName: string;
					sportName: string;
					trackingId: string;
					leagueName: string;
					coverageType: string;
				};
				duration: number;
				links: {
					api: {
						self: {
							href: string;
						};
					};
					mobile: {
						progressiveDownload: {
							href: string;
						};
						alert: {
							href: string;
						};
						source: {
							href: string;
						};
						href: string;
						streaming: {
							href: string;
						};
					};
					web: {
						seo: {
							href: string;
						};
						href: string;
						self: {
							dsi: {
								href: string;
							};
							href: string;
						};
					};
					source: {
						HD: {
							href: string;
						};
						HLS: {
							href: string;
							HD: {
								href: string;
							};
						};
						mezzanine: {
							href: string;
						};
						flash: {
							href: string;
						};
						href: string;
						full: {
							href: string;
						};
						hds: {
							href: string;
						};
					};
					sportscenter: {
						href: string;
					};
				};
				deviceRestrictions: {
					type: string;
					devices: string[];
				};
				headline: string;
			}>;
		}>;
	}>;
	name: string;
}
