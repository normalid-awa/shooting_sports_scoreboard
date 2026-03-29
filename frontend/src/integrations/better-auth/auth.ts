import { env } from "#/env";
import { createAuthClient } from "better-auth/react";
import { createAuthHooks } from "@daveyplate/better-auth-tanstack";

export const authClient = createAuthClient({
	basePath: new URL(env.VITE_BACKEND_ENDPOINT).pathname + "/auth",
	baseURL: new URL(env.VITE_BACKEND_ENDPOINT).origin,
	fetchOptions: {
		credentials: "include",
	},
});

const authHooks = createAuthHooks(authClient);

export const {
	useSession,
	usePrefetchSession,
	useToken,
	useListAccounts,
	useListSessions,
	useListDeviceSessions,
	useListPasskeys,
	useUpdateUser,
	useUnlinkAccount,
	useRevokeOtherSessions,
	useRevokeSession,
	useRevokeSessions,
	useSetActiveSession,
	useRevokeDeviceSession,
	useDeletePasskey,
	useAuthQuery,
	useAuthMutation,
} = authHooks;
