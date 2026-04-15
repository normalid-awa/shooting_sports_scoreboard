import { env } from "#/env";
import Client from "./client";

export const encoreClient = new Client(env.VITE_BACKEND_ENDPOINT);
