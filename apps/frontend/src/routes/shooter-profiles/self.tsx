import { CreateShooterProfileForm } from "#/components/CreateShooterProfileForm";
import EnsureAuth from "#/integrations/better-auth/EnsureAuth";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { Alpha3ToAlpha2Map } from "../../../../common/dist/regionalCode";
import { getShooterProfileQuery } from "#/apis/shooterProfile";

export const Route = createFileRoute("/shooter-profiles/self")({
	component: () => <EnsureAuth component={<RouteComponent />} />,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(getShooterProfileQuery());
	},
	staticData: {
		pageTitle: "My Shooter Profile",
	},
});

function RouteComponent() {
	const [showCreateShooterProfileModal, setShowCreateShooterProfileModal] =
		useState(false);

	return (
		<Container fixed maxWidth="lg">
			<Card sx={{ p: 2, m: 2 }} elevation={5}>
				<Stack spacing={2}>
					<Typography variant="h5">My shooter profiles</Typography>
					<Divider />
					<Suspense
						fallback={
							<Stack>
								<Skeleton height={100} />
								<Skeleton height={100} />
								<Skeleton height={100} />
							</Stack>
						}
					>
						<ShooterProfileList />
					</Suspense>
					<Divider />
					<Button
						fullWidth
						variant="outlined"
						onClick={() =>
							setShowCreateShooterProfileModal(
								!showCreateShooterProfileModal,
							)
						}
					>
						Add Shooter Profile
					</Button>
					<Collapse in={showCreateShooterProfileModal} unmountOnExit>
						<Card variant="outlined" sx={{ p: 2 }}>
							<CreateShooterProfileForm />
						</Card>
					</Collapse>
				</Stack>
			</Card>
		</Container>
	);
}

function ShooterProfileList() {
	const shooterProfiles = useSuspenseQuery(getShooterProfileQuery()).data
		?.data;

	return (
		<>
			{shooterProfiles?.length === 0 && (
				<Typography sx={{ my: 2 }} variant="body1" fontWeight="bold">
					You don't have any shooter profiles yet. Click the button
					below to create one and start tracking your shooting
					performance!
				</Typography>
			)}
			<Stack spacing={2} sx={{ mt: 2 }}>
				{shooterProfiles?.map((shooterProfile) => (
					<Card
						key={shooterProfile.id}
						sx={{ p: 2 }}
						variant="outlined"
					>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Typography variant="h5">
								{shooterProfile.sport}
							</Typography>
							<Divider sx={{ flexGrow: 1 }} />
							<div
								style={{
									padding: 5,
									backdropFilter: "blur(10px) invert(0.2)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img
									loading="lazy"
									height="30"
									src={`https://flagcdn.com/${Alpha3ToAlpha2Map[shooterProfile.region].toLowerCase()}.svg`}
									alt={`${shooterProfile.region}'s flag`}
								/>
							</div>
							<Typography variant="body1">
								Identifier: {shooterProfile.identifier}
							</Typography>
						</Stack>
					</Card>
				))}
			</Stack>
		</>
	);
}
