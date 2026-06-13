import { ModifyShooterProfileForm } from "#/components/CreateShooterProfileForm";
import EnsureAuth from "#/integrations/better-auth/EnsureAuth";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import {
	createShooterProfileMutation,
	deleteShooterProfileMutation,
	getUserShooterProfileQuery,
	updateShooterProfileMutation,
} from "#/apis/shooterProfile";
import { ShooterProfileCard } from "#/components/ShooterProfileCard";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { useConfirm } from "material-ui-confirm";
import { RegionalCodeMap } from "@shooting_sports_scoreboard/common";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const Route = createFileRoute("/shooter-profiles/self")({
	component: () => <EnsureAuth component={RouteComponent} />,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(getUserShooterProfileQuery());
	},
	staticData: {
		pageTitle: "My Shooter Profile",
	},
});

function RouteComponent() {
	const [showCreateShooterProfileModal, setShowCreateShooterProfileModal] =
		useState(false);

	const confirm = useConfirm();
	const createShooterProfile = useMutation(
		createShooterProfileMutation(confirm),
	);

	return (
		<Container fixed maxWidth="md">
			<Card sx={{ p: 2, m: 2 }}>
				<Stack spacing={{ xs: 1, sm: 2 }}>
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
						onClick={() => {
							setShowCreateShooterProfileModal(
								!showCreateShooterProfileModal,
							);
							setTimeout(
								() =>
									scrollTo({
										top: 100000,
										behavior: "smooth",
									}),
								300,
							);
						}}
					>
						Add Shooter Profile
					</Button>
					<Collapse in={showCreateShooterProfileModal} unmountOnExit>
						<Card variant="outlined" sx={{ p: 2 }}>
							<ModifyShooterProfileForm
								submitting={createShooterProfile.isPending}
								onSubmit={async (sport, region, identifier) => {
									await createShooterProfile.mutateAsync({
										sport,
										region,
										identifier,
									});
									setShowCreateShooterProfileModal(false);
								}}
								confirmationText="Create"
							/>
						</Card>
					</Collapse>
				</Stack>
			</Card>
		</Container>
	);
}

function ShooterProfileList() {
	const shooterProfiles = useSuspenseQuery(getUserShooterProfileQuery()).data
		?.data;
	const confirm = useConfirm();
	const deleteShooterProfileMutationFn = useMutation(
		deleteShooterProfileMutation(confirm),
	);
	const [editingShooterProfileIndex, setShowEditingShooterProfileModal] =
		useState<null | number>(null);
	const updateShooterProfileMutationFn = useMutation(
		updateShooterProfileMutation(confirm),
	);

	const deleteShooterProfile = (id: string) => async () => {
		const shooterProfile = shooterProfiles?.find(
			(profile) => profile.id === id,
		)!;
		if (
			!(
				await confirm({
					title: "Confirmation of deletion of shooter profile (IRREVERSIBLE OPERATION)",
					description: `Are you sure you want to delete the ${shooterProfile.sport} shooter profile with identifier ${shooterProfile.identifier} in ${RegionalCodeMap[shooterProfile.region]}?`,
					acknowledgement:
						"You have acknowledged the deletion is irreversible",
					confirmationText: "Delete",
				})
			).confirmed
		)
			return;
		await deleteShooterProfileMutationFn.mutateAsync(id);
	};

	return (
		<>
			{shooterProfiles?.length === 0 && (
				<Typography sx={{ my: 2 }} variant="body1" fontWeight="bold">
					You don't have any shooter profiles yet. Click the button
					below to create one and start tracking your shooting
					performance!
				</Typography>
			)}
			<Dialog
				open={editingShooterProfileIndex !== null}
				onClose={() => setShowEditingShooterProfileModal(null)}
				maxWidth="lg"
			>
				<DialogTitle>Modify Shooter Profile Info</DialogTitle>
				<DialogContent>
					{editingShooterProfileIndex !== null && (
						<ModifyShooterProfileForm
							sx={{ mt: 1 }}
							submitting={
								updateShooterProfileMutationFn.isPending
							}
							confirmationText="Update"
							defaultValue={{
								sport: shooterProfiles![
									editingShooterProfileIndex!
								].sport,
								region: shooterProfiles![
									editingShooterProfileIndex!
								].region,
								identifier:
									shooterProfiles![
										editingShooterProfileIndex!
									].identifier,
							}}
							onSubmit={(sport, region, identifier) => {
								updateShooterProfileMutationFn.mutateAsync(
									{
										id: shooterProfiles![
											editingShooterProfileIndex!
										].id,
										sport,
										region,
										identifier,
										name: shooterProfiles![
											editingShooterProfileIndex!
										].name,
									},
									{
										onSuccess: () =>
											setShowEditingShooterProfileModal(
												null,
											),
									},
								);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
			<Stack spacing={{ xs: 0, sm: 1 }} sx={{ mt: 2 }}>
				{shooterProfiles?.map((shooterProfile, index) => (
					<ShooterProfileCard
						key={shooterProfile.id}
						{...shooterProfile}
						slots={{
							action: (
								<Card
									variant="outlined"
									sx={{ borderRadius: 1e5 }}
								>
									<IconButton
										onClick={() =>
											setShowEditingShooterProfileModal(
												index,
											)
										}
									>
										<SettingsIcon />
									</IconButton>
									<IconButton
										color="error"
										onClick={deleteShooterProfile(
											shooterProfile.id,
										)}
										loading={
											deleteShooterProfileMutationFn.isPending
										}
									>
										<DeleteIcon />
									</IconButton>
								</Card>
							),
						}}
					/>
				))}
			</Stack>
		</>
	);
}
