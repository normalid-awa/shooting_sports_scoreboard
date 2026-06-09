import Typography from "@mui/material/Typography";
import {
	Alpha3ToAlpha2Map,
	type RegionalCode,
} from "@shooting_sports_scoreboard/common";

export function Flag(props: {
	region: RegionalCode;
	height: number;
	showCode: boolean;
}) {
	return (
		<>
			<Typography variant="overline" fontSize={16}>
				{props.region}
			</Typography>
			<div
				style={{
					padding: 2,
					backdropFilter: "blur(10px) invert(0.2)",
					display: "flex",
					marginLeft: 5,
				}}
			>
				<img
					loading="lazy"
					height={props.height}
					src={`https://flagcdn.com/${Alpha3ToAlpha2Map[props.region].toLowerCase()}.svg`}
					alt={`${props.region}'s flag`}
				/>
			</div>
		</>
	);
}
