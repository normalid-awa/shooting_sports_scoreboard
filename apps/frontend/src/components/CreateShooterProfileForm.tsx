import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
	Sports,
	RegionalCodes,
	RegionalCodeMap,
	Alpha3ToAlpha2Map,
	type Sport,
	type RegionalCode,
} from "@shooting_sports_scoreboard/common";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import { Flag } from "./Flag";

export function ModifyShooterProfileForm(props: {
	onSubmit?: (sport: Sport, region: RegionalCode, identifier: string) => void;
	submitting: boolean;
	confirmationText: string;
	defaultValue?: {
		sport?: Sport;
		region?: RegionalCode;
		identifier?: string;
	};
	sx?: SxProps<Theme>;
}) {
	return (
		<Grid
			sx={props.sx}
			container
			spacing={2}
			component="form"
			onSubmit={async (e) => {
				e.preventDefault();
				const formData = new FormData(e.target);
				const sport = formData.get("sport") as Sport;
				const region = formData.get("region") as RegionalCode;
				const identifier = formData.get("identifier") as string;
				props.onSubmit?.(sport, region, identifier);
			}}
		>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 6 }}>
				<FormControl fullWidth required>
					<InputLabel>Sport</InputLabel>
					<Select
						autoComplete="shooter-profile-sport"
						label="Sport"
						name="sport"
						defaultValue={props.defaultValue?.sport}
					>
						{Sports.map((sport) => (
							<MenuItem key={sport} value={sport}>
								{sport}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 6 }}>
				<FormControl fullWidth required>
					<InputLabel>Region</InputLabel>
					<Select
						autoComplete="shooter-profile-region"
						label="Region"
						name="region"
						defaultValue={props.defaultValue?.region}
					>
						{RegionalCodes.map((region) => (
							<MenuItem key={region} value={region}>
								<Flag
									region={region}
									sx={{ height: 20 }}
									showName
								/>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 12 }}>
				<TextField
					type="text"
					autoComplete="shooter-profile-identifier"
					defaultValue={props.defaultValue?.identifier}
					fullWidth
					required
					label="Identifier"
					name="identifier"
					variant="outlined"
					helperText="Unique identifier, e.g. ID given by your regional shooter association"
				/>
			</Grid>
			<Grid size={12}>
				<Button
					type="submit"
					variant="contained"
					fullWidth
					loading={props.submitting}
				>
					{props.confirmationText}
				</Button>
			</Grid>
		</Grid>
	);
}
