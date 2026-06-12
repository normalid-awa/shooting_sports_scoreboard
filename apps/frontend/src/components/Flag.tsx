import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
	Alpha3ToAlpha2Map,
	type RegionalCode,
} from "@shooting_sports_scoreboard/common";

export function Flag(props: {
	region: RegionalCode;
	height: number;
	showCode?: boolean;
}) {
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="center"
			width="fit-content"
			display="inline-flex"
			spacing={{ xs: 0, sm: 0.5 }}
		>
			{props.showCode && (
				<Typography
					variant="overline"
					fontSize={12}
					sx={{ m: 0, p: 0, lineHeight: 0 }}
				>
					{props.region}
				</Typography>
			)}
			<div
				style={{
					padding: 2,
					backdropFilter: "blur(10px) invert(0.2)",
					display: "flex",
					width: "fit-content",
				}}
			>
				<img
					loading="lazy"
					height={props.height}
					src={`https://flagcdn.com/${Alpha3ToAlpha2Map[props.region].toLowerCase()}.svg`}
					alt={`${props.region}'s flag`}
				/>
			</div>
		</Stack>
	);
}
