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
import { useMutation } from "@tanstack/react-query";
import { useConfirm } from "material-ui-confirm";
import { createShooterProfileMutation } from "#/apis/shooterProfile";

export function CreateShooterProfileForm() {
	const confirm = useConfirm();
	const createShooterProfile = useMutation(
		createShooterProfileMutation(confirm),
	);

	return (
		<Grid
			container
			spacing={2}
			component="form"
			onSubmit={async (e) => {
				e.preventDefault();
				const formData = new FormData(e.target);
				const sport = formData.get("sport") as Sport;
				const region = formData.get("region") as RegionalCode;
				const identifier = formData.get("identifier") as string;
				await createShooterProfile.mutateAsync({
					sport,
					region,
					identifier,
				});
			}}
		>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 6 }}>
				<FormControl fullWidth required>
					<InputLabel>Sport</InputLabel>
					<Select label="Sport" name="sport">
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
					<Select label="Region" name="region">
						{RegionalCodes.map((region) => (
							<MenuItem key={region} value={region}>
								<img
									loading="lazy"
									width="20"
									src={`https://flagcdn.com/${Alpha3ToAlpha2Map[region].toLowerCase()}.svg`}
									alt={`${region}'s flag`}
									style={{ marginRight: "5px" }}
								/>
								{RegionalCodeMap[region]}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 12 }}>
				<TextField
					fullWidth
					required
					label="Identifier"
					name="identifier"
					variant="outlined"
					helperText="Unique identifier, e.g. ID given by your regional shooter association"
				/>
			</Grid>
			<Grid size={12}>
				<Button type="submit" variant="contained" fullWidth>
					Create
				</Button>
			</Grid>
		</Grid>
	);
}
