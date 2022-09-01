import { useSession } from "next-auth/react";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useCreateRoom from "../../prisma_fuctions/useCreateRoom";
import { trpc } from "../../utils/trpc";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");
  const session = useSession();

  const handleNameChange = (name: string) => {
    setName(name);
    setPath(`/${name}`);
  };

  const mutation = trpc.useMutation("room.createRoom");
  const { mutate: createRoom } = useCreateRoom();
  const resetInputs = () => {
    setName("");
    setPath(""), setImage("");
  };


  const handleSend = () => {
    if (name === "" || path === "") return;
    const userId = session.data?.user?.id;
    if (userId) {
      const room = {
        name,
        path,
        image,
        userId,
      };
      createRoom(room);
    }
    resetInputs();
  };

  return (
    <div className="w-full">
      <h2 className="text-gray-900 text-4xl text-center">Add a room</h2>
      <div className="flex flex-col gap-2 mx-auto max-w-sm">
        <span className="p-float-label">
          <InputText
            value={name}
            id="name"
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Name"
          />
          <label htmlFor="in">name</label>
        </span>
        <span className="p-float-label">
          <InputText
            value={image}
            id="image"
            onChange={(e) => setImage(e.target.value)}
            placeholder="image"

          />
          <label htmlFor="in">image</label>
        </span>
     
     
        <div className="flex gap-2 mx-auto">
          <Button onClick={handleSend}>Send</Button>
        </div>

        {mutation.status === "success" && (
          <p className="bg-green-500 text-white p-3 rounded-lg">
            You have successfully created a room
          </p>
        )}
        {mutation.status === "error" && (
          <>
            <p className="bg-red-600 text-white p-3 rounded-lg">
              Room creation unsuccessful
            </p>
            <p>{mutation.error.message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
