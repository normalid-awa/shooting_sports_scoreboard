import { Service } from "encore.dev/service";
import { Bucket } from "encore.dev/storage/objects";

export default new Service("auth");

export const userAvatars = new Bucket("user-avatars", {
	versioned: false,
	public: true,
});
