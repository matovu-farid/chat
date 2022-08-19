import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProfilePic from "../../components/ProfilePic";
import TextField from "../../components/TextField";
import useUser from "../../hooks/useUser";
import IImage from "../../Interfaces/Image";
import { trpc } from "../../utils/trpc";

const UserPage:NextPage =() =>{
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [edited, setEdited] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<IImage>();
  const user = useUser()

  let innitialValues = { name, email, image };
  trpc.useQuery(["user.getUser", user.id], {
    onSuccess: (user) => {
      if (user) {
        const { name, email, image } = user;
        name && setName(name);
        email && setEmail(email);
        image && setImage(image);
        innitialValues = {
          name: name ?? "",
          email: email ?? "",
          image: image ?? "",
        };
      }
    },
  });
  const utils = trpc.useContext();
  const { mutate: saveUser } = trpc.useMutation(["user.saveUser"], {
    onSuccess: () => {
      utils.invalidateQueries(["user.getUser"]);
    },
  });
  const handleSave = () => {
    if (!edited) return;
    const user = { name, email, image };

    // saveUser(user);
  };
  useEffect(() => {
    setEdited(
      name !== innitialValues.name ||
        email !== innitialValues.email ||
        image !== innitialValues.image
    );
  }, [name, email, image]);

  return (
    <div>
      <div>
       <ProfilePic imageURL={image} setImage={setUploadedImage} />
        <TextField value={name} setValue={setName} placeholder="name" />
        <TextField value={email} setValue={setEmail} placeholder="email" />
      </div>
      {edited && <button onClick={handleSave}>Save</button>}
      Hello User page
    </div>
  );
}

export default UserPage;
