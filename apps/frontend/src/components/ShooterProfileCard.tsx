import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {
	type RegionalCode,
	type Sport,
} from "@shooting_sports_scoreboard/common";
import Grid from "@mui/material/Grid";
import { Flag } from "./Flag";
import type { ReactElement } from "react";

export function ShooterProfileCard(props: {
	sport: Sport;
	region: RegionalCode;
	identifier: string;
	slots?: {
		action?: ReactElement;
	};
}) {
	const { sport, region, identifier } = props;

	return (
		<Card sx={{ px: { xs: 1, md: 2 }, py: 0.5 }} variant="outlined">
			<Grid container spacing={{ xs: 1, sm: 2 }}>
				<Grid size={{ xs: 6, sm: 3 }} alignContent={"center"}>
					<Typography variant="h6">{sport}</Typography>
				</Grid>
				<Grid
					size={{ xs: 6, sm: "grow" }}
					justifyContent="end"
					alignItems="center"
					display="flex"
					flexDirection="row"
				>
					<Flag region={region} height={30} showCode />
				</Grid>
				<Grid size={{ xs: 6, sm: 1.5, md: 1 }} alignContent="center">
					<Typography variant="body2">{identifier}</Typography>
				</Grid>
				{props.slots?.action && (
					<Grid
						size={{ xs: 6, sm: "auto" }}
						justifyItems="end"
						justifyContent="end"
					>
						{props.slots.action}
					</Grid>
				)}
			</Grid>
		</Card>
	);
}
