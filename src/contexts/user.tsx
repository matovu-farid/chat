import { signIn, useSession } from "next-auth/react";
import {
  Context,
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import User from "../Interfaces/User";
import router from "next/router";

const dummyUser: User = {
  id: "",
  name: "",
  email: "",
  image: "",
};
export const UserCtx: Context<User> = createContext(dummyUser);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const { data, status } = useSession();
  useEffect(() => {
    const userFromSession = data?.user;
    if (userFromSession && status === "authenticated") {
      setUser(userFromSession);
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return user ? (
    <UserCtx.Provider value={user}>{children}</UserCtx.Provider>
  ) : (
    <>{children}</>
  );
};
export default UserProvider;
