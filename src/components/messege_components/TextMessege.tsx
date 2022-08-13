import { useSession } from "next-auth/react";
import React from "react";
import useUser from "../../hooks/useUser";
import { MessegeWithUser } from "../../Interfaces/Messege";
interface Props {
  messege: MessegeWithUser
}
const TextMessege = ({messege}: Props) => {
  const {
    createdAt,
    text,
    sender: { name: senderName },
  } = messege;
  const user = useUser()
  const getTime = (dateString: Date) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
    };
  };
  const { time, date } = getTime(createdAt);
  const isNotMyMessege = user.id != messege.sender.id
  return (
    <div className="flex w-full justify-end">

    <div className="rounded-2xl max-w-sm w-4/5 text-gray-900 shadow-lg">
      <p className="py-2 px-3 text-sm">{text}</p>
      <div className="p-1 px-3 text-xs flex justify-between">
        <p>{senderName}</p>
        <p>{`${time} on ${date}`}</p>
      </div>
    </div>
    </div>
  );
};

export default TextMessege;