export interface TeamInfo {
	id: string;
	slug: string;
	conference: string;
}

export interface ConferenceInfo {
	id: string;
	short: string;
	full: string;
	href: string;
}

export const teams: Record<string, TeamInfo> = {
	"army-black-knights": { id: "349", slug: "army-black-knights", conference: "aac" },
	"navy-midshipmen": { id: "2426", slug: "navy-midshipmen", conference: "aac" },
	"north-texas-mean-green": { id: "249", slug: "north-texas-mean-green", conference: "aac" },
	"east-carolina-pirates": { id: "151", slug: "east-carolina-pirates", conference: "aac" },
	"south-florida-bulls": { id: "58", slug: "south-florida-bulls", conference: "aac" },
	"tulane-green-wave": { id: "2655", slug: "tulane-green-wave", conference: "aac" },
	"tulsa-golden-hurricane": { id: "202", slug: "tulsa-golden-hurricane", conference: "aac" },
	"utsa-roadrunners": { id: "2636", slug: "utsa-roadrunners", conference: "aac" },
	"uab-blazers": { id: "5", slug: "uab-blazers", conference: "aac" },
	"charlotte-49ers": { id: "2429", slug: "charlotte-49ers", conference: "aac" },
	"memphis-tigers": { id: "235", slug: "memphis-tigers", conference: "aac" },
	"florida-atlantic-owls": { id: "2226", slug: "florida-atlantic-owls", conference: "aac" },
	"rice-owls": { id: "242", slug: "rice-owls", conference: "aac" },
	"temple-owls": { id: "218", slug: "temple-owls", conference: "aac" },
	"louisville-cardinals": { id: "97", slug: "louisville-cardinals", conference: "acc" },
	"boston-college-eagles": { id: "103", slug: "boston-college-eagles", conference: "acc" },
	"virginia-cavaliers": { id: "258", slug: "virginia-cavaliers", conference: "acc" },
	"clemson-tigers": { id: "228", slug: "clemson-tigers", conference: "acc" },
	"stanford-cardinal": { id: "24", slug: "stanford-cardinal", conference: "acc" },
	"syracuse-orange": { id: "183", slug: "syracuse-orange", conference: "acc" },
	"georgia-tech-yellow-jackets": { id: "59", slug: "georgia-tech-yellow-jackets", conference: "acc" },
	"florida-state-seminoles": { id: "52", slug: "florida-state-seminoles", conference: "acc" },
	"duke-blue-devils": { id: "150", slug: "duke-blue-devils", conference: "acc" },
	"miami-hurricanes": { id: "2390", slug: "miami-hurricanes", conference: "acc" },
	"pittsburgh-panthers": { id: "221", slug: "pittsburgh-panthers", conference: "acc" },
	"north-carolina-tar-heels": { id: "153", slug: "north-carolina-tar-heels", conference: "acc" },
	"smu-mustangs": { id: "2567", slug: "smu-mustangs", conference: "acc" },
	"virginia-tech-hokies": { id: "259", slug: "virginia-tech-hokies", conference: "acc" },
	"california-golden-bears": { id: "25", slug: "california-golden-bears", conference: "acc" },
	"nc-state-wolfpack": { id: "152", slug: "nc-state-wolfpack", conference: "acc" },
	"wake-forest-demon-deacons": { id: "154", slug: "wake-forest-demon-deacons", conference: "acc" },
	"byu-cougars": { id: "252", slug: "byu-cougars", conference: "big-12" },
	"utah-utes": { id: "254", slug: "utah-utes", conference: "big-12" },
	"ucf-knights": { id: "2116", slug: "ucf-knights", conference: "big-12" },
	"cincinnati-bearcats": { id: "2132", slug: "cincinnati-bearcats", conference: "big-12" },
	"colorado-buffaloes": { id: "38", slug: "colorado-buffaloes", conference: "big-12" },
	"texas-tech-red-raiders": { id: "2641", slug: "texas-tech-red-raiders", conference: "big-12" },
	"west-virginia-mountaineers": { id: "277", slug: "west-virginia-mountaineers", conference: "big-12" },
	"iowa-state-cyclones": { id: "66", slug: "iowa-state-cyclones", conference: "big-12" },
	"arizona-wildcats": { id: "12", slug: "arizona-wildcats", conference: "big-12" },
	"kansas-state-wildcats": { id: "2306", slug: "kansas-state-wildcats", conference: "big-12" },
	"arizona-state-sun-devils": { id: "9", slug: "arizona-state-sun-devils", conference: "big-12" },
	"oklahoma-state-cowboys": { id: "197", slug: "oklahoma-state-cowboys", conference: "big-12" },
	"baylor-bears": { id: "239", slug: "baylor-bears", conference: "big-12" },
	"tcu-horned-frogs": { id: "2628", slug: "tcu-horned-frogs", conference: "big-12" },
	"houston-cougars": { id: "248", slug: "houston-cougars", conference: "big-12" },
	"kansas-jayhawks": { id: "2305", slug: "kansas-jayhawks", conference: "big-12" },
	"illinois-fighting-illini": { id: "356", slug: "illinois-fighting-illini", conference: "big-ten" },
	"indiana-hoosiers": { id: "84", slug: "indiana-hoosiers", conference: "big-ten" },
	"iowa-hawkeyes": { id: "2294", slug: "iowa-hawkeyes", conference: "big-ten" },
	"michigan-wolverines": { id: "130", slug: "michigan-wolverines", conference: "big-ten" },
	"michigan-state-spartans": { id: "127", slug: "michigan-state-spartans", conference: "big-ten" },
	"washington-huskies": { id: "264", slug: "washington-huskies", conference: "big-ten" },
	"ohio-state-buckeyes": { id: "194", slug: "ohio-state-buckeyes", conference: "big-ten" },
	"oregon-ducks": { id: "2483", slug: "oregon-ducks", conference: "big-ten" },
	"penn-state-nittany-lions": { id: "213", slug: "penn-state-nittany-lions", conference: "big-ten" },
	"rutgers-scarlet-knights": { id: "164", slug: "rutgers-scarlet-knights", conference: "big-ten" },
	"wisconsin-badgers": { id: "275", slug: "wisconsin-badgers", conference: "big-ten" },
	"purdue-boilermakers": { id: "2509", slug: "purdue-boilermakers", conference: "big-ten" },
	"maryland-terrapins": { id: "120", slug: "maryland-terrapins", conference: "big-ten" },
	"nebraska-cornhuskers": { id: "158", slug: "nebraska-cornhuskers", conference: "big-ten" },
	"usc-trojans": { id: "30", slug: "usc-trojans", conference: "big-ten" },
	"minnesota-golden-gophers": { id: "135", slug: "minnesota-golden-gophers", conference: "big-ten" },
	"northwestern-wildcats": { id: "77", slug: "northwestern-wildcats", conference: "big-ten" },
	"ucla-bruins": { id: "26", slug: "ucla-bruins", conference: "big-ten" },
	"liberty-flames": { id: "2335", slug: "liberty-flames", conference: "cusa" },
	"sam-houston-bearkats": { id: "2534", slug: "sam-houston-bearkats", conference: "cusa" },
	"western-kentucky-hilltoppers": { id: "98", slug: "western-kentucky-hilltoppers", conference: "cusa" },
	"louisiana-tech-bulldogs": { id: "2348", slug: "louisiana-tech-bulldogs", conference: "cusa" },
	"florida-international-panthers": { id: "2229", slug: "florida-international-panthers", conference: "cusa" },
	"jacksonville-state-gamecocks": { id: "55", slug: "jacksonville-state-gamecocks", conference: "cusa" },
	"kennesaw-state-owls": { id: "338", slug: "kennesaw-state-owls", conference: "cusa" },
	"middle-tennessee-blue-raiders": { id: "2393", slug: "middle-tennessee-blue-raiders", conference: "cusa" },
	"utep-miners": { id: "2638", slug: "utep-miners", conference: "cusa" },
	"new-mexico-state-aggies": { id: "166", slug: "new-mexico-state-aggies", conference: "cusa" },
	"notre-dame-fighting-irish": { id: "87", slug: "notre-dame-fighting-irish", conference: "fbs-independent" },
	"uconn-huskies": { id: "41", slug: "uconn-huskies", conference: "fbs-independent" },
	"massachusetts-minutemen": { id: "113", slug: "massachusetts-minutemen", conference: "fbs-independent" },
	"buffalo-bulls": { id: "2084", slug: "buffalo-bulls", conference: "mac" },
	"central-michigan-chippewas": { id: "2117", slug: "central-michigan-chippewas", conference: "mac" },
	"eastern-michigan-eagles": { id: "2199", slug: "eastern-michigan-eagles", conference: "mac" },
	"toledo-rockets": { id: "2649", slug: "toledo-rockets", conference: "mac" },
	"ohio-bobcats": { id: "195", slug: "ohio-bobcats", conference: "mac" },
	"bowling-green-falcons": { id: "189", slug: "bowling-green-falcons", conference: "mac" },
	"western-michigan-broncos": { id: "2711", slug: "western-michigan-broncos", conference: "mac" },
	"akron-zips": { id: "2006", slug: "akron-zips", conference: "mac" },
	"miami-oh-redhawks": { id: "193", slug: "miami-oh-redhawks", conference: "mac" },
	"kent-state-golden-flashes": { id: "2309", slug: "kent-state-golden-flashes", conference: "mac" },
	"northern-illinois-huskies": { id: "2459", slug: "northern-illinois-huskies", conference: "mac" },
	"ball-state-cardinals": { id: "2050", slug: "ball-state-cardinals", conference: "mac" },
	"fresno-state-bulldogs": { id: "278", slug: "fresno-state-bulldogs", conference: "mountain-west" },
	"san-jose-state-spartans": { id: "23", slug: "san-jose-state-spartans", conference: "mountain-west" },
	"unlv-rebels": { id: "2439", slug: "unlv-rebels", conference: "mountain-west" },
	"boise-state-broncos": { id: "68", slug: "boise-state-broncos", conference: "mountain-west" },
	"colorado-state-rams": { id: "36", slug: "colorado-state-rams", conference: "mountain-west" },
	"hawaii-rainbow-warriors": { id: "62", slug: "hawaii-rainbow-warriors", conference: "mountain-west" },
	"nevada-wolf-pack": { id: "2440", slug: "nevada-wolf-pack", conference: "mountain-west" },
	"san-diego-state-aztecs": { id: "21", slug: "san-diego-state-aztecs", conference: "mountain-west" },
	"utah-state-aggies": { id: "328", slug: "utah-state-aggies", conference: "mountain-west" },
	"wyoming-cowboys": { id: "2751", slug: "wyoming-cowboys", conference: "mountain-west" },
	"air-force-falcons": { id: "2005", slug: "air-force-falcons", conference: "mountain-west" },
	"new-mexico-lobos": { id: "167", slug: "new-mexico-lobos", conference: "mountain-west" },
	"washington-state-cougars": { id: "265", slug: "washington-state-cougars", conference: "pac-12" },
	"oregon-state-beavers": { id: "204", slug: "oregon-state-beavers", conference: "pac-12" },
	"missouri-tigers": { id: "142", slug: "missouri-tigers", conference: "sec" },
	"tennessee-volunteers": { id: "2633", slug: "tennessee-volunteers", conference: "sec" },
	"georgia-bulldogs": { id: "61", slug: "georgia-bulldogs", conference: "sec" },
	"arkansas-razorbacks": { id: "8", slug: "arkansas-razorbacks", conference: "sec" },
	"lsu-tigers": { id: "99", slug: "lsu-tigers", conference: "sec" },
	"texas-am-aggies": { id: "245", slug: "texas-am-aggies", conference: "sec" },
	"south-carolina-gamecocks": { id: "2579", slug: "south-carolina-gamecocks", conference: "sec" },
	"florida-gators": { id: "57", slug: "florida-gators", conference: "sec" },
	"ole-miss-rebels": { id: "145", slug: "ole-miss-rebels", conference: "sec" },
	"texas-longhorns": { id: "251", slug: "texas-longhorns", conference: "sec" },
	"alabama-crimson-tide": { id: "333", slug: "alabama-crimson-tide", conference: "sec" },
	"oklahoma-sooners": { id: "201", slug: "oklahoma-sooners", conference: "sec" },
	"auburn-tigers": { id: "2", slug: "auburn-tigers", conference: "sec" },
	"vanderbilt-commodores": { id: "238", slug: "vanderbilt-commodores", conference: "sec" },
	"mississippi-state-bulldogs": { id: "344", slug: "mississippi-state-bulldogs", conference: "sec" },
	"kentucky-wildcats": { id: "96", slug: "kentucky-wildcats", conference: "sec" },
	"james-madison-dukes": { id: "256", slug: "james-madison-dukes", conference: "sun-belt" },
	"coastal-carolina-chanticleers": { id: "324", slug: "coastal-carolina-chanticleers", conference: "sun-belt" },
	"georgia-state-panthers": { id: "2247", slug: "georgia-state-panthers", conference: "sun-belt" },
	"georgia-southern-eagles": { id: "290", slug: "georgia-southern-eagles", conference: "sun-belt" },
	"marshall-thundering-herd": { id: "276", slug: "marshall-thundering-herd", conference: "sun-belt" },
	"old-dominion-monarchs": { id: "295", slug: "old-dominion-monarchs", conference: "sun-belt" },
	"app-state-mountaineers": { id: "2026", slug: "app-state-mountaineers", conference: "sun-belt" },
	"south-alabama-jaguars": { id: "6", slug: "south-alabama-jaguars", conference: "sun-belt" },
	"louisiana-ragin-cajuns": { id: "309", slug: "louisiana-ragin-cajuns", conference: "sun-belt" },
	"texas-state-bobcats": { id: "326", slug: "texas-state-bobcats", conference: "sun-belt" },
	"ul-monroe-warhawks": { id: "2433", slug: "ul-monroe-warhawks", conference: "sun-belt" },
	"arkansas-state-red-wolves": { id: "2032", slug: "arkansas-state-red-wolves", conference: "sun-belt" },
	"southern-miss-golden-eagles": { id: "2572", slug: "southern-miss-golden-eagles", conference: "sun-belt" },
	"troy-trojans": { id: "2653", slug: "troy-trojans", conference: "sun-belt" },
};

export const conferences: Record<string, ConferenceInfo> = {
	aac: {
		id: "aac",
		short: "AAC",
		full: "American Athletic Conference",
		href: "https://loodibee.com/wp-content/uploads/American_Athletic_Conference_logo-480x480.png",
	},
	acc: {
		id: "acc",
		short: "ACC",
		full: "Atlantic Coast Conference",
		href: "https://loodibee.com/wp-content/uploads/Atlantic_Coast_Conference_ACC_logo-480x480.png",
	},
	big12: {
		id: "big-12",
		short: "Big 12",
		full: "Big 12",
		href: "https://loodibee.com/wp-content/uploads/Big_12_Conference_logo-480x480.png",
	},
	bigten: {
		id: "big-ten",
		short: "Big Ten",
		full: "Big Ten",
		href: "https://loodibee.com/wp-content/uploads/Big_Ten_Conference_logo-480x480.png",
	},
	cusa: {
		id: "cusa",
		short: "C-USA",
		full: "Conference USA",
		href: "https://loodibee.com/wp-content/uploads/Conference_USA_logo-480x480.png",
	},
	ind: {
		id: "fbs-independent",
		short: "Independents",
		full: "FBS Independents",
		href: "https://loodibee.com/wp-content/uploads/Division-I-FBS-Independents-logo-480x480.png",
	},
	mac: {
		id: "mac",
		short: "MAC",
		full: "Mid-American Conference",
		href: "https://loodibee.com/wp-content/uploads/Mid-American_Conference_logo-480x480.png",
	},
	mwc: {
		id: "mountain-west",
		short: "Mountain West",
		full: "Mountain West",
		href: "https://loodibee.com/wp-content/uploads/Mountain_West_Conference_logo-480x480.png",
	},
	pac12: {
		id: "pac-12",
		short: "Pac-12",
		full: "Pac-12",
		href: "https://loodibee.com/wp-content/uploads/Pac-12_logo-480x480.png",
	},
	sec: {
		id: "sec",
		short: "SEC",
		full: "Southeastern Conference",
		href: "https://loodibee.com/wp-content/uploads/Southeastern_Conference_logo-480x480.png",
	},
	sbc: {
		id: "sun-belt",
		short: "Sun Belt",
		full: "Sun Belt",
		href: "https://loodibee.com/wp-content/uploads/Sun_Belt_Conference_2020_logo-480x480.png",
	},
};
