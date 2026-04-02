import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import viteReact from "@vitejs/plugin-react";

const config = defineConfig((confEnv) => {
	const env = loadEnv(confEnv.mode, process.cwd());
	return {
		plugins: [
			devtools(),
			tsconfigPaths({ projects: ["./tsconfig.json"] }),
			tanstackStart(),
			viteReact(),
			basicSsl(),
			...(confEnv.mode === "production"
				? [cloudflare({ viteEnvironment: { name: "ssr" } })]
				: []),
		],
		server: {
			proxy: {
				"/api": {
					target: env.VITE_LOCAL_BACKEND_ENDPOINT,
					changeOrigin: true,
					rewrite: (path) => path.replace(/\/api/, ""),
				},
			},
		},
	};
});

export default config;
