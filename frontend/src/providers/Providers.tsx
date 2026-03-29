import { createTheme, ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "#/components/layouts/Layout";
import { TimerProvider } from "#/providers/timer/TimerProvider";
import TanStackQueryProvider from "#/integrations/tanstack-query/root-provider";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import LoginForm from "#/components/LoginForm";
import Dialog from "@mui/material/Dialog";
import { useLoginModal } from "#/hooks/loginModalHooks";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { ConfirmProvider } from "material-ui-confirm";
import { useNavigate } from "@tanstack/react-router";

const theme = createTheme({
	colorSchemes: { light: true, dark: true },
	cssVariables: {
		colorSchemeSelector: "class",
	},
});

function ThemedProvider({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();
	const { closeLoginModal, showLoginModal } = useLoginModal();

	return (
		<>
			<ConfirmProvider>
				{children}

				<Dialog open={showLoginModal} onClose={closeLoginModal}>
					<DialogTitle>Login</DialogTitle>
					<DialogContent>
						<LoginForm
							onSuccess={() => {
								closeLoginModal();
								navigate({
									to: ".",
									reloadDocument: true,
								});
							}}
						/>
					</DialogContent>
				</Dialog>
			</ConfirmProvider>
		</>
	);
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<InitColorSchemeScript defaultMode="system" attribute="class" />
			<TanStackQueryProvider>
				<ThemeProvider theme={theme} defaultMode="system">
					<CssBaseline />
					<Layout>
						<AuthQueryProvider>
							<TimerProvider>
								<ThemedProvider>{children}</ThemedProvider>
							</TimerProvider>
						</AuthQueryProvider>
					</Layout>
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
			</TanStackQueryProvider>
		</>
	);
}
