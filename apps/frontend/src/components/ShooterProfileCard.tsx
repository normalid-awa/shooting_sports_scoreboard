import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {
	type RegionalCode,
	type Sport,
} from "@shooting_sports_scoreboard/common";
import Grid from "@mui/material/Grid";
import { Flag } from "./Flag";

export function ShooterProfileCard(props: {
	sport: Sport;
	region: RegionalCode;
	identifier: string;
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
				<Grid
					size={{ xs: 12, sm: 2 }}
					alignContent="center"
					justifyItems="end"
				>
					<Typography variant="body2">{identifier}</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}
