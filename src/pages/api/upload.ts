import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import formidable from "formidable";
import { Storage } from "@google-cloud/storage";
import { env } from "../../env/server.mjs";

const storage = new Storage({
  projectId: env.STORAGE_PROJECT_ID,
  credentials: {
    client_email: env.STORAGE_CLIENT_EMAIL,
    private_key: env.STORAGE_PRIVATE_KEY,
  },
});

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json("Could not upload file");
      res.end(String(err));
    }
    
      const file = files.profile as formidable.File;
      const bucket = storage.bucket(env.STORAGE_BUCKET_NAME);
       bucket.upload(file.filepath)
  });

  res.status(200).json("Uploaded sussfully");
};
export const config = {
  api: {
    bodyParser: false,
  },
};
export default upload;
