import { env } from "../env";

export default function transformObjectStoreUrl(url: string): string {
	return url.replace(
		"http://127.0.0.1:9800",
		env.PUBLIC_OBJECT_STORAGE_ENDPOINT,
	);
}
