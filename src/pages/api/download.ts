import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import formidable from "formidable";
import { env } from "../../env/server.mjs";
import getUserSession from "../../utils/session";
import googleStorage from "../../utils/cloud_storage";
import { saveImage } from "../../prisma_fuctions/user";

const download = async (req: NextApiRequest, res: NextApiResponse) => {
  const bucket = googleStorage.bucket(env.STORAGE_BUCKET_NAME);
  bucket.getSignedUrl

  res.status(200).json("Uploaded successfully");
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default download;
