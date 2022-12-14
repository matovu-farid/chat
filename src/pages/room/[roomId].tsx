import { useRouter } from "next/router";
import React from "react";
import MessegeSection from "../../components/messege_components/MessageSection";

const RoomPage = () => {
  const router = useRouter();
  const { roomId } = router.query;

  return typeof roomId === "string" ? (
    <RoomPageInternal roomId={roomId}></RoomPageInternal>
  ) :null;
};
interface Props {
  roomId: string;
}
const RoomPageInternal = ({ roomId }: Props) => {
  return (
    <div className="h-full">
      <MessegeSection roomId={roomId}></MessegeSection>
    </div>
  );
};

export default RoomPage;
