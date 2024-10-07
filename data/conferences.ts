export interface Props {
	id: number;
	slug: string;
	short: string;
	full: string;
	href: string;
}

export const conferences: Record<string, Props> = {
	acc: {
		id: 1,
		slug: "acc",
		short: "ACC",
		full: "Atlantic Coast Conference",
		href: "https://loodibee.com/wp-content/uploads/Atlantic_Coast_Conference_ACC_logo-480x480.png",
	},
	aac: {
		id: 151,
		slug: "aac",
		short: "AAC",
		full: "American Athletic Conference",
		href: "https://loodibee.com/wp-content/uploads/American_Athletic_Conference_logo-480x480.png",
	},
	big12: {
		id: 4,
		slug: "big12",
		short: "Big 12",
		full: "Big 12",
		href: "https://loodibee.com/wp-content/uploads/Big_12_Conference_logo-480x480.png",
	},
	bigten: {
		id: 5,
		slug: "bigten",
		short: "Big Ten",
		full: "Big Ten",
		href: "https://loodibee.com/wp-content/uploads/Big_Ten_Conference_logo-480x480.png",
	},
	cusa: {
		id: 12,
		slug: "cusa",
		short: "C-USA",
		full: "Conference USA",
		href: "https://loodibee.com/wp-content/uploads/Conference_USA_logo-480x480.png",
	},
	ind: {
		id: 18,
		slug: "ind",
		short: "Independents",
		full: "FBS Independents",
		href: "https://loodibee.com/wp-content/uploads/Division-I-FBS-Independents-logo-480x480.png",
	},
	mac: {
		id: 15,
		slug: "mac",
		short: "MAC",
		full: "Mid-American Conference",
		href: "https://loodibee.com/wp-content/uploads/Mid-American_Conference_logo-480x480.png",
	},
	mwc: {
		id: 17,
		slug: "mwc",
		short: "Mountain West",
		full: "Mountain West",
		href: "https://loodibee.com/wp-content/uploads/Mountain_West_Conference_logo-480x480.png",
	},
	pac12: {
		id: 9,
		slug: "pac12",
		short: "Pac-12",
		full: "Pac-12",
		href: "https://loodibee.com/wp-content/uploads/Pac-12_logo-480x480.png",
	},
	sec: {
		id: 8,
		slug: "sec",
		short: "SEC",
		full: "Southeastern Conference",
		href: "https://loodibee.com/wp-content/uploads/Southeastern_Conference_logo-480x480.png",
	},
	sbc: {
		id: 37,
		slug: "sbc",
		short: "Sun Belt",
		full: "Sun Belt",
		href: "https://loodibee.com/wp-content/uploads/Sun_Belt_Conference_2020_logo-480x480.png",
	},
};
