import { trpc } from '../utils/trpc'
import useUser from './useUser'

const useRoom = (roomId:string) => {
  
  return trpc.useQuery(["room.getRoom",roomId])
}

export default useRoom