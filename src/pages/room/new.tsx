import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Button from "../../components/Button";
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

  const handleSend = () => {
    const creator = session.data?.user?.id;
    if (creator) {
      const room = {
        name,
        path,
        image,
        creator,
      };
      const result = mutation.mutate(room);
    }
  };
  const inputStyles = "py-2 px-3 rounded-md border-gray-900 border";
  const labelStyles = "text-gray-900";
  return (
    <div className="w-full">
      <h2 className="text-gray-900 text-4xl text-center">Add a room</h2>
      <div className="flex flex-col gap-2 mx-auto max-w-sm">
        <input
          className={inputStyles}
          placeholder="Name"
          onChange={(e) => handleNameChange(e.target.value)}
          type="text"
          value={name}
          id={name}
        />
        <input
          className={inputStyles}
          placeholder="path"
          onChange={(e) => setPath(e.target.value)}
          type="text"
          value={path}
          id={path}
        />
        <input
          className={inputStyles}
          placeholder="image"
          onChange={(e) => setImage(e.target.value)}
          type="text"
          value={image}
          id={image}
        />
        <div className="flex gap-2 mx-auto">
          <Button onClick={handleSend}>Send</Button>
          <Button href="/">Home</Button>
          <Button href="/room">Rooms</Button>
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
