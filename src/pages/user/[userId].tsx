import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import TextField from "../../components/TextField";
import useUser from "../../hooks/useUser";
import { trpc } from "../../utils/trpc";
import Image from 'next/image'
import Button from "../../components/Button";
import { UserPageInternal } from ".";

const UserPage: NextPage = () => {
  const { query } = useRouter();
  const { userId } = query;

  return userId && typeof userId === "string" ? (
    <UserPageInternal userId={userId}></UserPageInternal>
  ) : null;
};
interface Props {
  userId: string;
}


export default UserPage;
