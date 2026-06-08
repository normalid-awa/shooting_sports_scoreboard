import Card, { type CardProps } from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HandymanIcon from "@mui/icons-material/Handyman";

export function TodoPlaceHolder(props: CardProps & { featureName: string }) {
	const { featureName, ...cardProps } = props;
	return (
		<Card elevation={3} sx={{ p: 2 }} {...cardProps}>
			<Stack
				justifyItems={"center"}
				alignItems={"center"}
				spacing={2}
				sx={{ p: 5 }}
			>
				<HandymanIcon sx={{ fontSize: 70 }} />
				<Typography variant="h5">
					Todo: {featureName} is under construction. Please check back
					later.
				</Typography>
			</Stack>
		</Card>
	);
}
