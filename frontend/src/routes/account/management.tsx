import EnsureAuth from "#/integrations/better-auth/EnsureAuth";
import { createFileRoute } from "@tanstack/react-router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { authClient, useSession } from "#/integrations/better-auth/auth";
import { useState, type ReactNode } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import FullScreenCircularProgress from "#/components/FullScreenCircularProgress";
import { useConfirm } from "material-ui-confirm";
import { getCroppedImg } from "#/components/ImageCropper";
import type { Area, Point } from "react-easy-crop";
import Cropper from "react-easy-crop";
import { encoreClient } from "#/integrations/tanstack-query/encore-client";

export const Route = createFileRoute("/account/management")({
	component: () => <EnsureAuth component={<RouteComponent />} />,
	head: () => ({
		meta: [{ title: "Shooting Sports Scoreboard | Account management" }],
	}),
	staticData: {
		pageTitle: "Management",
	},
});

function UserInfoGridItem(props: {
	slots: {
		displayText: ReactNode;
		actions?: ReactNode;
	};
}) {
	return (
		<>
			<Grid size={{ xs: 12, sm: 9 }} alignContent="center">
				{props.slots.displayText}
			</Grid>
			<Grid size={"grow"} alignContent="center">
				{props.slots.actions}
			</Grid>
		</>
	);
}

function EditUserInfoDialog(
	props: DialogProps & {
		infoLabel: string;
		onSave: (value: FormData) => void;
		formChildren: ReactNode;
		hideDialogAction?: true;
	},
) {
	const {
		onSave,
		infoLabel,
		formChildren,
		hideDialogAction,
		...dialogProps
	} = props;

	return (
		<Dialog
			{...dialogProps}
			component={"form"}
			onSubmit={(e) => {
				e.preventDefault();
				onSave(new FormData(e.target));
			}}
		>
			<DialogTitle>Edit {infoLabel}</DialogTitle>
			<DialogContent>{formChildren}</DialogContent>
			{!hideDialogAction && (
				<DialogActions>
					<Button
						onClick={() => props.onClose?.({}, "escapeKeyDown")}
					>
						Discard
					</Button>
					<Button type="submit">Save</Button>
				</DialogActions>
			)}
		</Dialog>
	);
}

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

function ImageCropperForm(props: {
	onClose: () => void;
	onSubmit: (blob: string) => void;
}) {
	const [imgSrc, setImgSrc] = useState<string | null>(null);
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState(0);
	const [crop, setCrop] = useState<Point>({
		x: 0,
		y: 0,
	});
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

	const onSubmit = async () => {
		const croppedImage = await getCroppedImg(
			imgSrc!,
			croppedAreaPixels!,
			rotation,
		);
		if (!croppedImage) return;
		props.onSubmit(croppedImage);
	};

	function readFile(file: File): Promise<string> {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.addEventListener(
				"load",
				() => resolve(reader.result as string),
				false,
			);
			reader.readAsDataURL(file);
			setScale(1);
		});
	}

	return (
		<>
			<Stack>
				<Button
					component="label"
					role={undefined}
					variant="contained"
					tabIndex={-1}
					startIcon={<CloudUploadIcon />}
				>
					Upload files
					<VisuallyHiddenInput
						type="file"
						accept="image/*"
						required
						onChange={async (e) =>
							setImgSrc(await readFile(e.target.files![0]))
						}
					/>
				</Button>
				{imgSrc && (
					<>
						<Box sx={{ width: "100%", height: 400 }}>
							<Cropper
								style={{
									containerStyle: {
										width: "100%",
										height: "100%",
										position: "relative",
									},
								}}
								image={imgSrc}
								crop={crop}
								zoom={scale}
								aspect={1}
								onCropComplete={(_, v) =>
									setCroppedAreaPixels(v)
								}
								onCropChange={setCrop}
								onZoomChange={setScale}
								rotation={rotation}
								onRotationChange={setRotation}
								cropShape="round"
							/>
						</Box>
						<FormGroup>
							<FormControlLabel
								label="Scale"
								labelPlacement="start"
								control={
									<Slider
										sx={{ ml: 2 }}
										value={scale}
										onChange={(_, value) => setScale(value)}
										min={0.1}
										max={10}
										step={0.1}
									/>
								}
							/>
							<FormControlLabel
								label="Rotation"
								labelPlacement="start"
								control={
									<Slider
										sx={{ ml: 2 }}
										value={rotation}
										onChange={(_, value) =>
											setRotation(value)
										}
										min={-180}
										max={180}
										step={1}
									/>
								}
							/>
						</FormGroup>
					</>
				)}
			</Stack>
			<DialogActions>
				<Button onClick={props.onClose}>Discard</Button>
				<Button onClick={() => onSubmit()}>Save</Button>
			</DialogActions>
		</>
	);
}

function RouteComponent() {
	const [openedDialog, setOpenedDialog] = useState<null | string>(null);
	const [loading, setLoading] = useState(false);
	const { user, refetch } = useSession();
	const confirm = useConfirm();

	async function onEditUsername(newName: string) {
		setLoading(true);
		const { error } = await authClient.updateUser({
			name: newName,
		});
		await refetch();
		setLoading(false);
		setOpenedDialog(null);
		if (error) {
			confirm({
				title: `Error (${error.statusText})`,
				content: error.message,
				hideCancelButton: true,
			});
			return;
		}
		confirm({
			title: "Success",
			description: `Your username has been updated to ${newName}.`,
			hideCancelButton: true,
		});
	}

	async function onEditEmail(newEamil: string) {
		setLoading(true);
		const { error } = await authClient.changeEmail({
			newEmail: newEamil,
		});
		await refetch();
		setLoading(false);
		setOpenedDialog(null);
		if (error) {
			confirm({
				title: `Error (${error.statusText})`,
				content: error.message,
				hideCancelButton: true,
			});
			return;
		}
		confirm({
			title: "Success",
			description: `Your email has been updated to ${newEamil}.`,
			hideCancelButton: true,
		});
	}

	async function onEditAvatar(blob: string) {
		setLoading(true);
		const { uploadUrl } = await encoreClient.auth.uploadAvatar();
		await fetch(uploadUrl, {
			body: await fetch(blob).then((r) => r.blob()),
			method: "PUT",
		});
		await refetch();
		setLoading(false);
		setOpenedDialog(null);
		confirm({
			title: "Success",
			description: "Your avatar has been updated.",
			hideCancelButton: true,
		});
	}

	return (
		<>
			<FullScreenCircularProgress showLoading={loading} />
			<EditUserInfoDialog
				infoLabel="Username"
				open={openedDialog == "username"}
				onSave={(data) =>
					onEditUsername(data.get("username")! as string)
				}
				onClose={() => setOpenedDialog(null)}
				formChildren={
					<FormControl sx={{ mt: 1 }} required>
						<InputLabel htmlFor="new-username-field">
							New username
						</InputLabel>
						<OutlinedInput
							label="New username"
							id="new-username-field"
							name="username"
							defaultValue={user!.name}
						/>
					</FormControl>
				}
			/>
			<EditUserInfoDialog
				infoLabel="Email"
				open={openedDialog == "email"}
				onSave={(formData) =>
					onEditEmail(formData.get("email")! as string)
				}
				onClose={() => setOpenedDialog(null)}
				formChildren={
					<FormControl sx={{ mt: 1 }} required>
						<InputLabel htmlFor="new-email-field">
							New email
						</InputLabel>
						<OutlinedInput
							label="New email"
							id="new-email-field"
							name="email"
							type="email"
							defaultValue={user!.email}
						/>
					</FormControl>
				}
			/>
			<EditUserInfoDialog
				maxWidth="md"
				fullWidth
				infoLabel="Avatar"
				open={openedDialog == "avatar"}
				onSave={(formData) =>
					onEditAvatar(formData.get("avatar")! as string)
				}
				onClose={() => setOpenedDialog(null)}
				hideDialogAction
				formChildren={
					<ImageCropperForm
						onClose={() => setOpenedDialog(null)}
						onSubmit={onEditAvatar}
					/>
				}
			/>
			<Container maxWidth="md" sx={{ pt: 2 }}>
				<Stack>
					<Paper variant="outlined" sx={{ p: 2 }}>
						<Grid container spacing={2}>
							<Grid
								size={{ xs: 12, sm: 2 }}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Badge
									overlap="circular"
									badgeContent={
										<IconButton
											onClick={() =>
												setOpenedDialog("avatar")
											}
										>
											<EditIcon />
										</IconButton>
									}
									color="primary"
									slotProps={{
										badge: {
											sx: {
												height: "unset",
											},
										},
									}}
									sx={{ width: "100%" }}
								>
									<Avatar
										sx={{
											width: "100%",
											height: "fit-content",
											aspectRatio: "1/1",
										}}
									>
										{user?.image ? (
											<img
												src={user!.image}
												width="100%"
												height="100%"
											/>
										) : (
											<>{user?.name[0]}</>
										)}
									</Avatar>
								</Badge>
							</Grid>
							<Grid
								size={{ xs: 12, sm: 10 }}
								container
								spacing={{ xs: 0.1, sm: 1 }}
							>
								<UserInfoGridItem
									slots={{
										displayText: (
											<Typography variant="subtitle1">
												Username: {user?.name}
											</Typography>
										),
										actions: (
											<Button
												variant="outlined"
												fullWidth
												onClick={() =>
													setOpenedDialog("username")
												}
											>
												Edit username
											</Button>
										),
									}}
								/>
								<UserInfoGridItem
									slots={{
										displayText: (
											<Typography variant="subtitle1">
												Email: {user?.email}
											</Typography>
										),
										actions: (
											<Button
												variant="outlined"
												fullWidth
												onClick={() =>
													setOpenedDialog("email")
												}
											>
												Edit email
											</Button>
										),
									}}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Stack>
			</Container>
		</>
	);
}
