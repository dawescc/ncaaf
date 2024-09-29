import Image from "next/image";
import styles from "@./styles.module.css";

type Logo = {
	href: string;
	width: number;
	height: number;
	alt: string;
	rel: string[];
};

type TeamLogoProps = {
	teamId: number;
	width?: number;
	height?: number;
	className?: string;
};

async function getTeamLogos(teamId: number): Promise<Logo[]> {
	const res = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/${teamId}`);
	if (!res.ok) throw new Error("Failed to fetch team data");
	const data = await res.json();
	return data.team.logos;
}

export default async function TeamLogo({ teamId, width, height, className }: TeamLogoProps) {
	const logos = await getTeamLogos(teamId);
	const defaultLogo = logos.find((logo) => logo.rel.includes("default"));
	const darkLogo = logos.find((logo) => logo.rel.includes("dark"));

	if (!defaultLogo || !darkLogo) {
		throw new Error("Required logos not found");
	}

	return (
		<Image
			src={defaultLogo.href}
			alt={defaultLogo.alt || "Team Logo"}
			width={width || defaultLogo.width}
			height={height || defaultLogo.height}
			className={`${styles.logo} ${className || ""}`}
			style={
				{
					"--logo-light": `url(${defaultLogo.href})`,
					"--logo-dark": `url(${darkLogo.href})`,
				} as React.CSSProperties
			}
		/>
	);
}
