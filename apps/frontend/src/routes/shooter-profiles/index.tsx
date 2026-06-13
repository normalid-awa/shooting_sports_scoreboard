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
import { useTheme, type SxProps, type Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
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
import { listShooterProfilesQuery } from "#/apis/shooterProfile";
import { emptyArrayOrValue } from "#/utils";
import Divider from "@mui/material/Divider";
import { useResponsiveLayout } from "#/hooks/useResponsiveLayout";
import { ShooterProfileCard } from "#/components/ShooterProfileCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

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
		page: z.int().optional().default(1),
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({ deps, context }) => {
		return await context.queryClient.fetchQuery(
			listShooterProfilesQuery({
				filter: {
					logic: "and",
					conditions: [
						...emptyArrayOrValue(deps.search != undefined, {
							logic: "or",
							conditions: [
								{
									field: "name",
									operator: "like",
									value: `%${deps.search}%`,
								},
								{
									field: "identifier",
									operator: "like",
									value: `%${deps.search}%`,
								},
							],
						}),
						...emptyArrayOrValue(deps.region != undefined, {
							field: "region",
							operator: "in",
							value: deps.region!,
						}),
						...emptyArrayOrValue(deps.sports != undefined, {
							field: "sport",
							operator: "in",
							value: deps.sports!,
						}),
					],
				},
				pagination: {
					orderBy: deps.sortBy,
					order: deps.sortOrder,
					page: deps.page,
				},
			}),
		);
	},
	staticData: {
		pageTitle: "Shooter Profiles",
	},
});

function RouteComponent() {
	const [, collapsedTopBar] = useResponsiveLayout();

	return (
		<Stack
			spacing={{ xs: 0, sm: 1 }}
			divider={<Divider />}
			sx={{ height: "100%" }}
		>
			<TodoPlaceHolder featureName="User's shooter profile" />
			<Card
				sx={{
					pt: { xs: 1, sm: 2 },
					pb: { xs: 0, sm: 2 },
					px: { xs: 1, sm: 2 },
					position: "sticky",
					top: collapsedTopBar ? 0 : 60,
					transition: (theme) =>
						`top ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.standard}ms`,
				}}
			>
				<ShooterProfileListFilterBlock />
			</Card>
			<ShooterProfileList />
		</Stack>
	);
}

function ShooterProfileListFilterBlock(props: { sx?: SxProps<Theme> }) {
	const searchArg = Route.useSearch();
	const navigate = Route.useNavigate();
	const debouncedNavigate = useCallback(debounce(navigate, 500), [navigate]);
	const { data: shooters } = Route.useLoaderData();

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
			resetScroll: false,
		});
	}, [region, search, sortBy, sortOrder, sports]);

	return (
		<>
			<Grid
				container
				spacing={{ xs: 1, md: 2 }}
				sx={{ ...(props.sx ?? {}) }}
			>
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
										alignItems="center"
										direction="row"
										divider={<span>,</span>}
										spacing={{ xs: 0.2, sm: 1 }}
										overflow="auto"
									>
										{selected.map((v) => (
											<Flag
												key={v}
												region={v}
												sx={{
													height: 20,
												}}
												slotProps={{
													root: {
														minWidth: "min-content",
													},
												}}
												showCode
											/>
										))}
									</Stack>
								);
							}}
						>
							{RegionalCodes.map((region) => (
								<MenuItem
									value={region}
									key={region}
									dense={dense}
								>
									<Stack
										direction="row"
										spacing={1}
										alignItems="center"
										display={"inline-flex"}
									>
										<Flag
											region={region}
											sx={{
												height: 25,
											}}
											showCode
											showName
											oneliner
											noBorder
										/>
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
										e.target
											.value as keyof typeof sortOptions,
									)
								}
							>
								{Object.entries(sortOptions).map(
									(sortOption) => (
										<MenuItem
											key={sortOption[0]}
											value={sortOption[0]}
											dense={dense}
										>
											{sortOption[1]}
										</MenuItem>
									),
								)}
							</Select>
						</FormControl>
						<FormControl fullWidth>
							<InputLabel size={sizes}>Sort order</InputLabel>
							<Select
								input={<OutlinedInput label="Sort order" />}
								size={sizes}
								value={sortOrder}
								onChange={(e) =>
									setSortOrder(
										e.target.value as "asc" | "desc",
									)
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
					<Stack
						direction="row"
						spacing={1}
						sx={{ overflowX: "auto" }}
					>
						<Chip
							label="All"
							variant={sports.length == 0 ? "filled" : "outlined"}
							icon={
								sports.length == 0 ? (
									<CheckCircleIcon />
								) : undefined
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
										selected ? (
											<CheckCircleIcon />
										) : undefined
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
			<Collapse in={shooters.length == 0}>
				<Typography
					textAlign="center"
					variant="h4"
					fontSize="3vh"
					pt={1}
				>
					No shooter profiles found. Try{" "}
					<Button
						sx={{ fontSize: "inherit" }}
						onClick={() => {
							setSearch("");
							setSports([]);
							setRegion([]);
						}}
					>
						reset
					</Button>{" "}
					the filter to see more shooter profiles.
				</Typography>
			</Collapse>
		</>
	);
}

function ShooterProfileList() {
	const { data: shooters } = Route.useLoaderData();

	return (
		<Card sx={{ flexGrow: 1, p: 1 }}>
			<Grid container spacing={1}>
				{shooters.map((shooter) => (
					<Grid
						size={{
							xs: 12 / 1,
							sm: 12 / 2,
							lg: 12 / 3,
							xl: 12 / 4,
						}}
						key={shooter.id}
					>
						<ShooterProfileCard
							size="small"
							id={shooter.id}
							identifier={shooter.identifier}
							region={shooter.region}
							sport={shooter.sport}
						/>
					</Grid>
				))}
			</Grid>
		</Card>
	);
}
