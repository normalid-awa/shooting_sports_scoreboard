const isOnWorker = () => navigator.userAgent === "Cloudflare-Workers";

export default isOnWorker;
