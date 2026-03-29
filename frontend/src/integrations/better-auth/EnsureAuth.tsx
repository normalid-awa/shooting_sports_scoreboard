import { useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "./auth";
import type { ReactElement } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoginForm from "#/components/LoginForm";
import FullScreenCircularProgress from "#/components/FullScreenCircularProgress";
import Paper from "@mui/material/Paper";

export default function EnsureAuth({ component }: { component: ReactElement }) {
	const { data: result, isLoading } = useSuspenseQuery({
		queryKey: [],
		queryFn: () => authClient.getSession(),
	});

	if (isLoading) return <FullScreenCircularProgress showLoading />;

	if (result.data?.user) return <>{component}</>;
	else
		return (
			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					height: "80%",
				}}
			>
				<Paper sx={{ p: 5 }}>
					<Stack
						alignItems="center"
						justifyItems="center"
						spacing={2}
					>
						<Typography variant="button" color="warning">
							This page is protected, you must logged in in order
							to view this page
						</Typography>
						<LoginForm />
					</Stack>
				</Paper>
			</Container>
		);
}
