import { authClient } from "#/integrations/better-auth/auth";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import FullScreenCircularProgress from "./FullScreenCircularProgress";
import {
	Checkbox,
	Divider,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";

interface LoginFormProps {
	onSuccess?: () => void;
}

export default function LoginForm(props: LoginFormProps) {
	const confirm = useConfirm();
	const [showLoading, setShowLoading] = useState(false);

	async function emailLogin(
		email: string,
		password: string,
		rememberMe: boolean,
	) {
		setShowLoading(true);
		const result = await authClient.signIn.email({
			email: email,
			password: password,
			rememberMe: rememberMe,
		});
		setShowLoading(false);

		if (result.error) {
			confirm({
				title: `Login Failed (${result.error.statusText})`,
				content: result.error.message,
				hideCancelButton: true,
			});
			return;
		}

		confirm({
			title: "Login Successful",
			content: `You have been logged in as ${result.data.user.name} successfully.`,
			hideCancelButton: true,
		});
		props.onSuccess?.();
	}

	return (
		<>
			<FullScreenCircularProgress showLoading={showLoading} />
			<Stack
				component={"form"}
				sx={{ pt: 1 }}
				spacing={1}
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const email = formData.get("email") as string;
					const password = formData.get("password") as string;
					const rememberMe = formData.get("rememberMe") === "on";
					emailLogin(email, password, rememberMe);
				}}
			>
				<FormControl variant="outlined" required>
					<InputLabel htmlFor="login_email_field">Email</InputLabel>
					<OutlinedInput
						type="email"
						id="login_email_field"
						name="email"
						autoComplete="email"
						placeholder="Email"
						label="Email"
						inputMode="email"
					/>
				</FormControl>
				<FormControl variant="outlined" required>
					<InputLabel htmlFor="login_password_field">
						Password
					</InputLabel>
					<OutlinedInput
						type="password"
						id="login_password_field"
						name="password"
						autoComplete="current-password"
						placeholder="Password"
						label="Password"
					/>
				</FormControl>
				<FormControl>
					<FormControlLabel
						control={<Checkbox name="rememberMe" />}
						label="Remember me"
					/>
					<FormHelperText sx={{ p: 0, m: 0 }}>
						Stay logged in even after closing the browser
					</FormHelperText>
				</FormControl>
				<Divider />
				<ButtonGroup fullWidth>
					<Button variant="outlined">Register</Button>
					<Button variant="contained" type="submit">
						Login
					</Button>
				</ButtonGroup>
			</Stack>
		</>
	);
}
