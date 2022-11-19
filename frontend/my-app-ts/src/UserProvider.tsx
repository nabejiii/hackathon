import * as React from 'react';
import { User, UserDemo } from './SignIn/User';

export type FlagContextType = {
    loginUser: User;
    setLoginUser: React.Dispatch<React.SetStateAction<User>>;
}
const FlagContext = ({
    loginUser: UserDemo,
    setLoginUser: () => {},
  });
export const UserContext = React.createContext<FlagContextType>(FlagContext);

export const UserProvider = (props :any) => {
  const [loginUser, setLoginUser] = React.useState(UserDemo);
  const value = {
    loginUser,
    setLoginUser,
  };
  return(
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  )
}
