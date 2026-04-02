import { authClient } from "#/integrations/better-auth/auth";
import Avatar from "@mui/material/Avatar";
import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { defaultAuthQueryOptions } from "@daveyplate/better-auth-tanstack";

export default function UserCard({ ...props }: ButtonProps) {
	const {
		data: { data: session },
		isLoading,
	} = useSuspenseQuery({
		queryKey: defaultAuthQueryOptions.sessionKey,
		queryFn: () => authClient.getSession(),
	});

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
						) : session?.user?.image ? (
							<img
								src={session?.user.image}
								width="100%"
								height="100%"
							/>
						) : (
							(session?.user?.name[0] ?? "G")
						)}
					</Avatar>
				}
				{...props}
			>
				{isLoading ? (
					<Skeleton variant="text" width={100} />
				) : (
					<Typography variant="h6" color="textSecondary">
						{session?.user?.name || "Login"}
					</Typography>
				)}
			</Button>
		</Box>
	);
}
