import { trpc } from '../utils/trpc'
import useUser from './useUser'

const useRooms = () => {
  const user = useUser()
  return trpc.useQuery(["room.getRooms",user.id])
}

export default useRooms