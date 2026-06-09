import { getIsomorphicRequestHeaders } from "#/integrations/headers";
import { client } from "#/integrations/tanstack-query/api";
import type { RegionalCode, Sport } from "@shooting_sports_scoreboard/common";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { useConfirm } from "material-ui-confirm";

export const createShooterProfileMutation = (
	confirm: ReturnType<typeof useConfirm>,
) =>
	mutationOptions({
		mutationKey: ["create-shooter-profile"],
		mutationFn: async (data: {
			sport: Sport;
			region: RegionalCode;
			identifier: string;
		}) => {
			await client["shooter-profile"].post({
				identifier: data.identifier,
				sport: data.sport,
				region: data.region,
				name: "",
			});
		},
		onSuccess: async (_data, _variable, _result, context) => {
			await context.client.invalidateQueries({
				queryKey: ["self-shooter-profiles"],
			});
		},
		onError: (error: Error) => {
			console.error(error);
			confirm({
				title: "Error when creating shooter profile",
				content: error.message,
				hideCancelButton: true,
			});
		},
	});

export const getUserShooterProfileQuery = () =>
	queryOptions({
		queryKey: ["self-shooter-profiles"],
		queryFn: async () =>
			await client["shooter-profile"]["self"].get({
				headers: getIsomorphicRequestHeaders(),
			}),
	});

export const updateShooterProfileMutation = (
	confirm: ReturnType<typeof useConfirm>,
) =>
	mutationOptions({
		mutationKey: ["update-shooter-profile"],
		mutationFn: async (data: {
			id: string;
			sport: Sport;
			region: RegionalCode;
			identifier: string;
			name: string;
		}) => {
			await client["shooter-profile"]({ id: data.id }).put({
				identifier: data.identifier,
				sport: data.sport,
				region: data.region,
				name: data.name,
			});
		},
		onSuccess: async (_data, _variable, _result, context) => {
			await context.client.invalidateQueries({
				queryKey: ["self-shooter-profiles"],
			});
		},
		onError: (error: Error) => {
			console.error(error);
			confirm({
				title: "Error when updating shooter profile",
				content: error.message,
				hideCancelButton: true,
			});
		},
	});

export const deleteShooterProfileMutation = (
	confirm: ReturnType<typeof useConfirm>,
) =>
	mutationOptions({
		mutationKey: ["delete-shooter-profile"],
		mutationFn: async (id: string) => {
			await client["shooter-profile"]({ id }).delete();
		},
		onSuccess: async (_data, _variable, _result, context) => {
			await context.client.invalidateQueries({
				queryKey: ["self-shooter-profiles"],
			});
		},
		onError: (error: Error) => {
			console.error(error);
			confirm({
				title: "Error when deleting shooter profile",
				content: error.message,
				hideCancelButton: true,
			});
		},
	});
