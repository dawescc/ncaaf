"use client";

import { formatDateTime } from "@/lib/utils";

interface ClientTimeProps {
	utcDate: string;
}

const ClientTime: React.FC<ClientTimeProps> = ({ utcDate }) => {
	const localDate = new Date(utcDate);
	const formattedTime = formatDateTime(localDate);

	return <span>{formattedTime}</span>;
};

export default ClientTime;
