import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import formidable from "formidable";
import { env } from "../../env/server.mjs";
import getUserSession from "../../utils/session";
import googleStorage from "../../utils/cloud_storage";
import { saveImage } from "../../prisma_fuctions/user";

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await getUserSession({ req, res });
  const userId = user?.id;
  const form = userId
    ? formidable({ multiples: false, filename: () => userId })
    : formidable({ multiples: false });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json("Could not upload file");
      res.end(String(err));
    }

    const file = files.profile as formidable.File;
    const bucket = googleStorage.bucket(env.STORAGE_BUCKET_NAME);
    const uploadFile=async ()=>{
      const res = await bucket.upload(file.filepath)
      if (user?.id)
      await saveImage({ image: res[0].publicUrl(), userId: user.id }, prisma);
    }
    uploadFile()
  
  });

  res.status(200).json("Uploaded successfully");
};

export const config = {
  api: {
    bodyParser: false,
  },
};
export default upload;
