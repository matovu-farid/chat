import Image from "next/image";
import React, { ReactNode, useState } from "react";
import IImage from "../Interfaces/Image";
import { FileUpload } from "primereact/fileupload";

interface Props {
  imageURL: string;
}

const ProfilePic = ({ imageURL }: Props) => {

  return (
    <div className="mx-auto">
      <Image src={imageURL} alt="profile" width={150} height={150}></Image>
      <FileUpload  name="profile" url="/api/upload" accept="image/*" maxFileSize={1000000} />
    </div>
  );
};

export default ProfilePic;
