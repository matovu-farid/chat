import { trpc } from "../utils/trpc";

const useCreateRoom = () => {
  const utils = trpc.useContext()
  return trpc.useMutation("room.createRoom",{
    onSuccess: ()=>{
      utils.invalidateQueries(["room.getRooms"])
    },
  });
};
export default useCreateRoom;
