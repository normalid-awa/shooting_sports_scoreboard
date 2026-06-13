import Card from "@mui/material/Card";
import {
	type RegionalCode,
	type Sport,
} from "@shooting_sports_scoreboard/common";
import { Flag } from "./Flag";
import type { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type { SxProps, Theme } from "@mui/material/styles";

export function ShooterProfileCard(props: {
	id: string;
	sport: Sport;
	region: RegionalCode;
	identifier: string;
	slots?: {
		action?: ReactElement;
	};
	size?: "small" | "medium";
	sx?: SxProps<Theme>;
}) {
	const { sport, region, identifier } = props;

	return (
		<Card
			sx={{
				p: 0,
				viewTransitionName: `shooter-profile-card-${props.id}`,
				...props.sx,
			}}
		>
			<Flag
				region={region}
				sx={{ width: "100%" }}
				showCode
				showName
				noBorder
				slotProps={{
					root: {
						width: "100%",
					},
					flag: {
						height: "50px",
					},
				}}
				size={props.size}
				slot={{
					start: (
						<Typography variant="h6" width={75}>
							{sport}
						</Typography>
					),
					end: (
						<Stack direction="row" spacing={1} alignItems="center">
							<Typography variant="subtitle1">
								Identifier: {identifier}
							</Typography>
							{props.slots?.action}
						</Stack>
					),
				}}
			/>
		</Card>
	);
}
