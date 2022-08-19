import { Storage } from "@google-cloud/storage";
import { env } from "../env/server.mjs";
const googleStorage = new Storage({
  projectId: env.STORAGE_PROJECT_ID,
  credentials: {
    client_email: env.STORAGE_CLIENT_EMAIL,
    private_key: env.STORAGE_PRIVATE_KEY,
  },
});
export default googleStorage