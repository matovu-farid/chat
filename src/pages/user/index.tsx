import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import TextField from "../../components/TextField";
import useUser from "../../hooks/useUser";
import { trpc } from "../../utils/trpc";
import Image from 'next/image'
import Button from "../../components/Button";

const ProfilePage: NextPage = () => {

  const user = useUser()

  return  (
    <div className="flex flex-col gap-5 items-start mx-auto max-w-[1200px]">

      <UserPageInternal userId={user.id}></UserPageInternal>
      <Button href="/user/edit">Edit</Button>
    </div>
  ) ;
};
interface Props {
  userId: string;
}
export const UserPageInternal = ({ userId }: Props) => {
  const { data: user } = trpc.useQuery(["user.getUser", userId], {});
  return user ? <div className="flex gap-2 ">
    {

    (user.image)&&<Image src={user.image} alt="profile" width={150} height={150}></Image>
    }
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl">{user.name}</h2>
      <h3 className="text-lg">{user.email}</h3>
    </div>
    
  </div> : null;
};

export default ProfilePage;
