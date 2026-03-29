import { useSession } from "#/integrations/better-auth/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export default function UserCard({ onClick }: { onClick?: () => void }) {
	const { isLoading, user } = useSession();

	return (
		<Paper variant="elevation" sx={{ width: "100%" }}>
			<Button
				onClick={onClick}
				disabled={isLoading}
				sx={{
					width: "100%",
					px: 2,
					py: 1,
					textTransform: "none",
				}}
				startIcon={
					<Avatar>
						{isLoading ? (
							<CircularProgress />
						) : (
							user?.name?.[0] || "G"
						)}
					</Avatar>
				}
			>
				{isLoading ? (
					<Skeleton variant="text" width={100} />
				) : (
					<Typography variant="h6" color="textSecondary">
						{user?.name || "Login"}
					</Typography>
				)}
			</Button>
		</Paper>
	);
}
