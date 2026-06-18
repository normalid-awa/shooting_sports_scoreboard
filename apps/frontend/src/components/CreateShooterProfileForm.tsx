import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import {
	Sports,
	RegionalCodes,
	type Sport,
	type RegionalCode,
	BaseSport,
	getSportFromSportEnum,
	isSportHasDivisions,
	isSportHasClassifications,
} from "@shooting_sports_scoreboard/common";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";
import { Flag } from "./Flag";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { HiddenInput } from "./HiddenInput";

function DivisionsField(props: {
	divisions: readonly string[];
	defaultValue?: string[];
}) {
	const [divisions, setDivisions] = useState<string[]>(
		props.defaultValue ?? [],
	);

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		setDivisions(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<FormControl fullWidth required>
			<HiddenInput name="divisions" value={JSON.stringify(divisions)} />
			<InputLabel>Divisions</InputLabel>
			<Select
				label="Divisions"
				name="divisions"
				multiple
				value={divisions}
				onChange={handleChange}
				renderValue={(selected) => selected.join(", ")}
			>
				{props.divisions.map((division) => {
					const selected = divisions.includes(division);
					const SelectionIcon = selected
						? CheckBoxIcon
						: CheckBoxOutlineBlankIcon;

					return (
						<MenuItem key={division} value={division}>
							<SelectionIcon
								fontSize="small"
								style={{
									marginRight: 8,
									padding: 9,
									boxSizing: "content-box",
								}}
							/>
							<ListItemText primary={division} />
						</MenuItem>
					);
				})}
			</Select>
			<FormHelperText>Divisions you will participate</FormHelperText>
		</FormControl>
	);
}

function DivisionsClassificationField(props: {
	divisions: readonly string[];
	classes: readonly string[];
	defaultValue?: Record<string, string>;
}) {
	const [divisionsClassifications, setDivisionsClassifications] = useState<
		Record<string, string>
	>(props.defaultValue ?? {});
	const length = Object.keys(divisionsClassifications).length;

	return (
		<Card sx={{ p: 1 }}>
			<HiddenInput
				name="divisionsClassifications"
				value={JSON.stringify(divisionsClassifications)}
			/>
			<Stack>
				<Divider sx={{ mb: 1 }}>Divisions & Classes</Divider>
				{Object.entries(divisionsClassifications).map((dc, k) => {
					return (
						<Stack
							spacing={1}
							direction="row"
							key={dc[0]}
							alignItems="center"
						>
							<FormControl fullWidth required>
								{k == 0 && <InputLabel>Division</InputLabel>}
								<Select
									label={k == 0 ? "Division" : ""}
									value={dc[0]}
									onChange={(e) => {
										const newDcs = structuredClone(
											divisionsClassifications,
										);
										newDcs[e.target.value] = dc[1];
										delete newDcs[dc[0]];
										setDivisionsClassifications(newDcs);
									}}
								>
									{props.divisions.map((division) => (
										<MenuItem
											key={division}
											value={division}
										>
											{division}
										</MenuItem>
									))}
								</Select>
								{k + 1 == length && (
									<FormHelperText>
										Divisions you will participate
									</FormHelperText>
								)}
							</FormControl>
							<FormControl fullWidth required>
								{k == 0 && (
									<InputLabel>Claasification</InputLabel>
								)}
								<Select
									label={k == 0 ? "Classification" : ""}
									value={dc[1]}
									onChange={(e) => {
										const newDcs = structuredClone(
											divisionsClassifications,
										);
										newDcs[dc[0]] = e.target.value;
										setDivisionsClassifications(newDcs);
									}}
								>
									{props.classes.map((division) => (
										<MenuItem
											key={division}
											value={division}
										>
											{division}
										</MenuItem>
									))}
								</Select>
								{k + 1 == length && (
									<FormHelperText>
										Class given by shooting association
									</FormHelperText>
								)}
							</FormControl>
							<IconButton
								color="error"
								sx={{ height: "100%" }}
								onClick={() => {
									const newDcs = structuredClone(
										divisionsClassifications,
									);
									delete newDcs[dc[0]];
									setDivisionsClassifications(newDcs);
								}}
							>
								<ClearIcon />
							</IconButton>
						</Stack>
					);
				})}
				<Button
					fullWidth
					variant="outlined"
					onClick={() => {
						setDivisionsClassifications((v) => ({
							...v,
							[""]: "",
						}));
					}}
				>
					Add
				</Button>
			</Stack>
		</Card>
	);
}

function SportSpecificField(props: {
	sport: Sport;
	defaultValue?: {
		divisions?: string[];
		divisionsClassifications?: Record<string, string>;
	};
}) {
	let sport: BaseSport = new (getSportFromSportEnum(props.sport))();

	if (isSportHasClassifications(sport) && isSportHasDivisions(sport))
		return (
			<DivisionsClassificationField
				divisions={sport.divisions}
				classes={sport.classifications}
				defaultValue={props.defaultValue?.divisionsClassifications}
			/>
		);
	if (isSportHasDivisions(sport))
		return (
			<DivisionsField
				divisions={sport.divisions}
				defaultValue={props.defaultValue?.divisions}
			/>
		);
}

export function ModifyShooterProfileForm(props: {
	onSubmit?: (
		sport: Sport,
		region: RegionalCode,
		identifier: string,
		divisions?: string[],
		divisionsClassifications?: Record<string, string>,
	) => void;
	submitting: boolean;
	confirmationText: string;
	defaultValue?: {
		sport?: Sport;
		region?: RegionalCode;
		identifier?: string;
		divisions?: string[];
		divisionsClassifications?: Record<string, string>;
	};
	sx?: SxProps<Theme>;
}) {
	const [sport, setSport] = useState<Sport | "">(
		props.defaultValue?.sport ?? "",
	);

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
				const divisions = JSON.parse(
					formData.get("divisions") as string,
				) as string[];
				const divisionsClassifications = JSON.parse(
					formData.get("divisionsClassifications") as string,
				) as Record<string, string>;
				props.onSubmit?.(
					sport,
					region,
					identifier,
					divisions || undefined,
					divisionsClassifications || undefined,
				);
			}}
		>
			<Grid size={{ xs: 12, md: 12 / 3, sm: 6 }}>
				<FormControl fullWidth required>
					<InputLabel>Sport</InputLabel>
					<Select
						autoComplete="shooter-profile-sport"
						label="Sport"
						name="sport"
						value={sport}
						onChange={(e) => setSport(e.target.value)}
					>
						<MenuItem value="" disabled>
							Select a sport
						</MenuItem>
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
			{sport != "" && (
				<Grid size={12}>
					<SportSpecificField
						sport={sport}
						defaultValue={props.defaultValue}
					/>
				</Grid>
			)}
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
