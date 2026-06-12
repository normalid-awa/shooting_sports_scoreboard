import { Flag } from "#/components/Flag";
import { TodoPlaceHolder } from "#/components/TodoPlaceHolder";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
	RegionalCodeMap,
	RegionalCodes,
	Sports,
	type RegionalCode,
	type Sport,
} from "@shooting_sports_scoreboard/common";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import z from "zod";
import ClearIcon from "@mui/icons-material/Clear";
import { debounce } from "@mui/material/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const sortOptions = {
	name: "Name",
	createdAt: "Creation Date",
} as const;

export const Route = createFileRoute("/shooter-profiles/")({
	component: RouteComponent,
	validateSearch: z.object({
		search: z.string().optional(),
		region: z
			.array(z.enum(RegionalCodes))
			.transform((v) => ((v?.length || 0) == 0 ? undefined : v))
			.optional(),
		sports: z
			.array(z.enum(Sports))
			.transform((v) => ((v?.length || 0) == 0 ? undefined : v))
			.optional(),
		sortBy: z.keyof(z.object(sortOptions)).optional().default("createdAt"),
		sortOrder: z
			.union([z.literal("asc"), z.literal("desc")])
			.optional()
			.default("desc"),
	}),
	staticData: {
		pageTitle: "Shooter Profiles",
	},
});

function RouteComponent() {
	return (
		<Stack spacing={2} sx={{ p: 2 }}>
			<TodoPlaceHolder featureName="User's shooter profile" />
			<ShooterProfileList />
		</Stack>
	);
}

function ShooterProfileListFilterBlock() {
	const searchArg = Route.useSearch();
	const navigate = Route.useNavigate();
	const debouncedNavigate = useCallback(debounce(navigate, 500), [navigate]);

	const theme = useTheme();
	const mobileLayout = useMediaQuery(theme.breakpoints.down("md"));
	const sizes = useMemo(
		() => (mobileLayout ? "small" : "medium"),
		[mobileLayout],
	);
	const dense = sizes == "small";

	const [region, setRegion] = useState<RegionalCode[]>(
		searchArg.region ?? [],
	);
	const [search, setSearch] = useState(searchArg.search ?? "");
	const [sortBy, setSortBy] = useState<keyof typeof sortOptions>(
		searchArg.sortBy,
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
		searchArg.sortOrder,
	);
	const [sports, setSports] = useState<Sport[]>(searchArg.sports ?? []);

	useEffect(() => {
		debouncedNavigate({
			search: {
				region,
				search,
				sortBy,
				sortOrder,
				sports,
			},
		});
	}, [region, search, sortBy, sortOrder, sports]);

	return (
		<Grid container spacing={{ xs: 1, md: 2 }} sx={{ p: { xs: 1, md: 2 } }}>
			<Grid size={{ xs: 12, sm: "grow" }}>
				<TextField
					label="Search"
					type="search"
					fullWidth
					size={sizes}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 8, md: 8, lg: 7 }}>
				<FormControl fullWidth>
					<InputLabel size={sizes}>Region</InputLabel>
					<Select
						input={<OutlinedInput label="Region" />}
						fullWidth
						size={sizes}
						multiple
						value={region}
						onChange={(e) =>
							setRegion(
								(typeof e.target.value == "string"
									? e.target.value.split(",")
									: e.target.value) as RegionalCode[],
							)
						}
						MenuProps={{
							slotProps: {
								paper: {
									style: {
										maxHeight: "40vh",
									},
								},
							},
						}}
						endAdornment={
							(region?.length ?? 0) > 0 && (
								<InputAdornment position="end">
									<IconButton
										onClick={() => setRegion([])}
										edge="end"
										sx={{ mr: 1 }}
									>
										<ClearIcon />
									</IconButton>
								</InputAdornment>
							)
						}
						renderValue={(selected) => {
							if (selected.length == 0) return;
							return (
								<Stack
									direction="row"
									divider={<span>,</span>}
									spacing={{ xs: 0.2, sm: 1 }}
								>
									{selected.map((v) => (
										<>
											<Flag
												key={v}
												region={v}
												height={10}
												showCode
											/>
										</>
									))}
								</Stack>
							);
						}}
					>
						{RegionalCodes.map((region) => (
							<MenuItem value={region} key={region} dense={dense}>
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									display={"inline-flex"}
								>
									<Flag region={region} height={10} />
									{RegionalCodeMap[region]}
								</Stack>
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid size={{ xs: 12, sm: 5 }}>
				<Stack direction="row" spacing={1}>
					<FormControl fullWidth>
						<InputLabel size={sizes}>Sort by</InputLabel>
						<Select
							input={<OutlinedInput label="Sort by" />}
							size={sizes}
							value={sortBy}
							onChange={(e) =>
								setSortBy(
									e.target.value as keyof typeof sortOptions,
								)
							}
						>
							{Object.entries(sortOptions).map((sortOption) => (
								<MenuItem
									key={sortOption[0]}
									value={sortOption[0]}
									dense={dense}
								>
									{sortOption[1]}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel size={sizes}>Sort order</InputLabel>
						<Select
							input={<OutlinedInput label="Sort order" />}
							size={sizes}
							value={sortOrder}
							onChange={(e) =>
								setSortOrder(e.target.value as "asc" | "desc")
							}
						>
							<MenuItem value="asc" dense={dense}>
								Ascending
							</MenuItem>
							<MenuItem value="desc" dense={dense}>
								Descending
							</MenuItem>
						</Select>
					</FormControl>
				</Stack>
			</Grid>
			<Grid size={{ xs: 12, sm: 7 }} alignContent="center">
				<Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
					<Chip
						label="All"
						variant={sports.length == 0 ? "filled" : "outlined"}
						icon={
							sports.length == 0 ? <CheckCircleIcon /> : undefined
						}
						color={sports.length == 0 ? "primary" : "default"}
						onClick={() => setSports([])}
						size={sizes}
					/>
					{Sports.map((sport) => {
						const selected = sports.includes(sport);
						return (
							<Chip
								label={sport}
								onClick={() =>
									setSports((prev) =>
										prev.includes(sport)
											? prev.filter((s) => s != sport)
											: [...prev, sport],
									)
								}
								icon={
									selected ? <CheckCircleIcon /> : undefined
								}
								variant={selected ? "filled" : "outlined"}
								color={selected ? "primary" : "default"}
								size={sizes}
								key={sport}
							/>
						);
					})}
				</Stack>
			</Grid>
		</Grid>
	);
}

function ShooterProfileList() {
	return (
		<Card>
			<Stack>
				<ShooterProfileListFilterBlock />
			</Stack>
		</Card>
	);
}
