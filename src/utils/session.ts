import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../pages/api/auth/[...nextauth]";

interface SessionOptions {
  req: NextApiRequest;
  res: NextApiResponse;
}
/**Get the session and the user for that session from next-auth */
export default async function getUserSession({ req, res }: SessionOptions) {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user;
  return { session, user };
}
