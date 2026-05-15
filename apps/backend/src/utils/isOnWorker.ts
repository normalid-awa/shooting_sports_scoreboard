let isOnWorker = () => {
	const result = navigator.userAgent === "Cloudflare-Workers";
	isOnWorker = () => result;
	return result;
};

export default isOnWorker;
