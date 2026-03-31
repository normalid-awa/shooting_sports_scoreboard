import { useSession } from "#/integrations/better-auth/auth";
import Avatar from "@mui/material/Avatar";
import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export default function UserCard({ ...props }: ButtonProps) {
	const { isLoading, user } = useSession();

	return (
		<Box sx={{ width: "100%" }}>
			<Button
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
						) : user?.image ? (
							<img src={user.image} width="100%" height="100%" />
						) : (
							(user?.name[0] ?? "G")
						)}
					</Avatar>
				}
				{...props}
			>
				{isLoading ? (
					<Skeleton variant="text" width={100} />
				) : (
					<Typography variant="h6" color="textSecondary">
						{user?.name || "Login"}
					</Typography>
				)}
			</Button>
		</Box>
	);
}
