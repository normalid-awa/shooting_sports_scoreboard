import { useNavigate, useSearch } from "@tanstack/react-router";

export function useLoginModal() {
	const navigate = useNavigate();
	const { showLoginModal = false } = useSearch({
		from: "__root__",
	}) as { showLoginModal?: boolean };

	function openLoginModal() {
		navigate({
			to: ".",
			search: (old) => ({ ...old, showLoginModal: true }),
		});
	}

	function closeLoginModal() {
		navigate({
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
