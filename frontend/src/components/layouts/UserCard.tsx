import { useSuspenseSession } from "#/integrations/better-auth/auth";
import Avatar from "@mui/material/Avatar";
import Button, { type ButtonProps } from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function UserCard({ ...props }: ButtonProps) {
	const { session } = useSuspenseSession();

	return (
		<Box sx={{ width: "100%" }}>
			<Button
				sx={{
					width: "100%",
					px: 2,
					py: 1,
					textTransform: "none",
				}}
				startIcon={
					<Avatar>
						{session?.user?.image ? (
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
				<Typography variant="h6" color="textSecondary">
					{session?.user?.name || "Login"}
				</Typography>
			</Button>
		</Box>
	);
}
