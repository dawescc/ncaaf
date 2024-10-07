/* eslint-disable jsx-a11y/alt-text */

import styles from "./team-logo.module.css";
import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
	id: string | number;
};

const TeamLogo = (props: Props) => {
	const { id, ...rest } = props;

	return (
		<>
			<Image
				{...rest}
				src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`}
				className={`${rest.className || ""} ${styles["team-logo"]}`}
			/>
			<Image
				{...rest}
				src={`https://a.espncdn.com/i/teamlogos/ncaa/500-dark/${id}.png`}
				className={`${rest.className || ""} ${styles["team-logo-dark"]}`}
			/>
		</>
	);
};

export default TeamLogo;
