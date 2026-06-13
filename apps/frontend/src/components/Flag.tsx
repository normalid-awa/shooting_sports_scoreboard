import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useColorScheme, type SxProps, type Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
	Alpha3ToAlpha2Map,
	RegionalCodeMap,
	type RegionalCode,
} from "@shooting_sports_scoreboard/common";
import type { ReactElement } from "react";

export function Flag(props: {
	region: RegionalCode;
	sx?: SxProps<Theme>;
	showCode?: boolean;
	showName?: boolean;
	oneliner?: boolean;
	noBorder?: boolean;
	slotProps?: {
		root?: SxProps<Theme>;
		flag?: SxProps<Theme>;
	};
	slot?: {
		start?: ReactElement;
		end?: ReactElement;
	};
	size?: "small" | "medium";
}) {
	const { mode, systemMode } = useColorScheme();

	const isSmall = props.size === "small";
	return (
		<Box
			sx={{
				width: "fit-content",
				borderColor: "rgba(125,125,125, 0.2)",
				borderStyle: "solid",
				borderWidth: props.noBorder ? 0 : 1,
				borderRadius: (theme) => theme.vars?.shape.borderRadius,
				overflow: "hidden",
				display: "block",
				clipPath: "border-box",
				...(props.slotProps?.root ?? {}),
			}}
		>
			<Box
				sx={{
					backgroundImage: `url('https://flagcdn.com/${Alpha3ToAlpha2Map[props.region].toLowerCase()}.svg')`,
					backgroundSize: "100%",
					backgroundPosition: "center",
					...props.sx,
				}}
			>
				<Grid
					container
					alignItems="center"
					sx={{
						pl: props.slot?.start && 1,
						height: "100%",
						backdropFilter: `blur(${(mode == "system" && systemMode == "dark") || mode == "dark" ? 7 : 10}px) brightness(${(mode == "system" && systemMode == "dark") || mode == "dark" ? 0.8 : 1.2}) grayscale(0.1) contrast(0.6)`,
					}}
				>
					{props.slot?.start && (
						<Grid size="auto" display="flex">
							<>{props.slot.start}</>
						</Grid>
					)}
					<Grid
						size={isSmall ? "grow" : "auto"}
						height="100%"
						display="flex"
						flexDirection={isSmall ? "row-reverse" : "row"}
						justifyContent={isSmall ? "end" : "start"}
						sx={{ ...(props.slotProps?.flag ?? {}) }}
					>
						<img
							loading="lazy"
							height="100%"
							src={`https://flagcdn.com/${Alpha3ToAlpha2Map[props.region].toLowerCase()}.svg`}
						/>
						<Stack
							alignItems={
								props.oneliner
									? "center"
									: isSmall
										? "flex-end"
										: "flex-start"
							}
							justifyContent="center"
							height="100%"
							sx={{ overflowY: "auto" }}
							direction={props.oneliner ? "row" : "column"}
							px={1}
						>
							{props.showName && (
								<Typography
									lineHeight="1"
									textOverflow="ellipsis"
								>
									{RegionalCodeMap[props.region]}
								</Typography>
							)}
							{props.showCode && (
								<Typography
									variant="subtitle1"
									fontSize="1rem"
									fontWeight="100"
									fontFamily="system-ui"
									lineHeight="1"
								>
									{props.oneliner
										? `(${props.region})`
										: props.region}
								</Typography>
							)}
						</Stack>
					</Grid>
					{props.slot?.end && (
						<Grid size={isSmall ? 12 : "grow"}>
							<Box
								sx={{ justifySelf: isSmall ? "start" : "end" }}
							>
								<>{props.slot.end}</>
							</Box>
						</Grid>
					)}
				</Grid>
			</Box>
		</Box>
	);
}
