import { AiFillPlusCircle } from "react-icons/ai";
import useUser from "../hooks/useUser";
import User from "../Interfaces/User";

interface Props {
  key: string;
  handleUserClicked: (clickedUser: User) => void;
}
function UserTile(props: Props) {
  const user = useUser();
  return (
    <button
      onClick={() => props.handleUserClicked(user)}
      className="transition-colors my-0 px-2 rounded-lg cursor-pointer hover:bg-gray-900 hover:text-white active:text-white"
    >
      <div className="flex py-1 justify-start">
        <div className="w-[90%]">{user.name}</div>
        <div className="w-[10%] hover:bg-green-600 rounded-sm flex flex-col justify-center items-center">
          <AiFillPlusCircle className=""></AiFillPlusCircle>
        </div>
      </div>
    </button>
  );
}
export default UserTile;
