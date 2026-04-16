import { useNavigate, useSearch } from "@tanstack/react-router";

export function useLoginModal() {
	const navigate = useNavigate();
	const { showLoginModal = false } = useSearch({
		from: "__root__",
	}) as unknown as { showLoginModal?: boolean };

	async function openLoginModal() {
		await navigate({
			to: ".",
			search: (old) => ({ ...old, showLoginModal: true }),
		});
	}

	async function closeLoginModal() {
		await navigate({
			to: ".",
			search: (old) => ({ ...old, showLoginModal: undefined }),
		});
	}

	return {
		showLoginModal,
		openLoginModal,
		closeLoginModal,
	} as const;
}
