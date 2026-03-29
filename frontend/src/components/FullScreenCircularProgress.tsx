import { CircularProgress, Modal } from "@mui/material";

export default function FullScreenCircularProgress({
	showLoading,
}: {
	showLoading: boolean;
}) {
	return (
		<Modal
			open={showLoading}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CircularProgress />
		</Modal>
	);
}
