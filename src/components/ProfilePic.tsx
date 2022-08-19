import Image from "next/image";
import React, { ReactNode, useState } from "react";
import IImage from "../Interfaces/Image";
import { FileUpload } from "primereact/fileupload";

interface Props {
  imageURL: string;
  setImage: (file: IImage) => void;
}

const ProfilePic = ({ imageURL, setImage }: Props) => {
  console.log(imageURL);
  const handleChangeImage = (files: FileList | null) => {
    if (files && files[0]) {
      const image = {
        data: files[0],
        preview: URL.createObjectURL(files[0]),
      };
      const file = files[0];
      const fileName = encodeURIComponent(file.name);
      console.log(fileName);
      setImage(image);
    }
  };
  return (
    <div className="mx-auto">
      <FileUpload name="profile" url="/api/upload" accept="image/*" maxFileSize={1000000} />
    </div>
  );
};

export default ProfilePic;
