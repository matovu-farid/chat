import { useSession } from "next-auth/react"
import { useContext } from "react"
import { UserCtx } from "../contexts/user"

const useUser=()=>{
  const user = useContext(UserCtx)
  return user
}
export default useUser