import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import {BsFillTelephonePlusFill} from "react-icons/bs"
import usePeer from "../hooks/usePeer";
import useUser from "../hooks/useUser";
import User from "../Interfaces/User";

interface Props {
  key: string;
  handleUserClicked: (clickedUser: User) => void;
  searchedUser:User
}


function UserTile(props: Props) {
  const router = useRouter()
  const user = useUser()
  const {addCallInfo} = usePeer()
  const handleCall = () => {
    const callerId = user.id;
    const calledId = props.searchedUser.id
    addCallInfo({ callerId, calledId });
    router.push("/chat/video");
  };
  
  return (
    <div className="w-full transition-colors flex items-center">

    <button
      onClick={() => props.handleUserClicked(props.searchedUser)}
      className="w-[90%]  my-0 px-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
    >
      <div className="flex py-1 justify-start">
        <div className="w-[90%]">{props.searchedUser.name}</div>
        <div className="w-[10%] hover:bg-green-600 rounded-sm flex flex-col justify-center items-center">
          <AiFillPlusCircle className=""></AiFillPlusCircle>
        </div>
      </div>
    </button>
    <button className="w-[10%] hover:bg-green-500 hover:text-gray-900 text-green-500  h-full p-1 rounded-md" onClick={handleCall} >

    <BsFillTelephonePlusFill />
    </button>
    </div>
    
  );
}
export default UserTile;
