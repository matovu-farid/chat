import React, { useState } from "react";
import { trpc } from "../../utils/trpc";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [image, setImage] = useState("");

  const handleSend=()=>{

    const room = {
      name,path, image
    }
    trpc.useQuery(["room.createRoom",room])
    
  }
  const inputStyles = "py-2 px-3 rounded-md";
  return (
    <div className="mx-auto">
    <form>
      <label htmlFor="name">{name}</label><br />
      <input className={inputStyles} onChange={(e)=>setName(e.target.value)} type="text" value={name}  id={name} />
      <label htmlFor="path">{path}</label><br />
      <input className={inputStyles} onChange={(e)=>setPath(e.target.value)} type="text" value={path} id={path} />
      <label htmlFor="image">{image}</label><br />
      <input className={inputStyles} onChange={(e)=>setImage(e.target.value)} type="text" value={image} id={image} />
    </form>
    <button
    onClick={handleSend}
        className="bg-blue-500
        text-white rounded-md shadow-none 
        active:bg-slate-600"
    >Send</button>
    </div>
  );
};

export default CreateRoom;
